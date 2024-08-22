import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/model/user.model';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, pass: string) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Create JWT payload and token
    const payload = { email: user.email, sub: user.id };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      statusCode: HttpStatus.OK,
      message: 'Login successful',
      data: {
        access_token: accessToken,
      },
    };
  }

  async register(userData: CreateAuthDto) {
    // Check if email already exists
    const existingUser = await this.userService.findOneByEmail(userData.email);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = await User.create({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    });

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Registration successful',
      data: newUser,
    };
  }
}
