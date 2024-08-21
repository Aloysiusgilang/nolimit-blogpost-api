import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { Dialect } from 'sequelize/types';
import { User } from './user/model/user.model';
import { Post } from './post/model/post.model';

export const sequelizeConfigFactory = (
  configService: ConfigService,
): SequelizeModuleOptions => ({
  dialect: 'mysql' as Dialect,
  host: configService.get<string>('DB_HOST', 'localhost'),
  port: configService.get<number>('DB_PORT', 3306),
  username: configService.get<string>('DB_USERNAME', 'dbgilang'),
  password: configService.get<string>('DB_PASSWORD', 'Aloyranger141'),
  database: configService.get<string>('DB_NAME', 'dev_nolimit'),
  autoLoadModels: true,
  synchronize: false,
  models: [User, Post],
});
