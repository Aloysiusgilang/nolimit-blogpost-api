import { BadRequestException, Injectable, HttpStatus } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './model/post.model';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post)
    private postModel: typeof Post,
  ) {}

  findAll() {
    return this.postModel.findAll();
  }

  findOne(id: number) {
    return this.postModel.findOne({
      where: {
        id,
      },
    });
  }

  async create(userId: number, createPostDto: CreatePostDto): Promise<any> {
    const newPost = await this.postModel.create({
      authorId: userId,
      ...createPostDto,
    });

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Post created successfully',
      data: newPost,
    };
  }

  async update(
    userId: number,
    postId: number,
    updatePostDto: UpdatePostDto,
  ): Promise<any> {
    // get the associated post
    const post = await this.findOne(postId);

    // check if the post exists
    if (!post) {
      throw new BadRequestException('Post not found');
    }

    // check if the user is the author of the post
    if (post.authorId !== userId) {
      throw new BadRequestException('You are not the author of this post');
    }

    // update the post
    await post.update({
      ...updatePostDto,
      updatedAt: new Date(),
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Post updated successfully',
      data: post,
    };
  }

  async remove(userId: number, postId: number): Promise<any> {
    // get the associated post
    const post = await this.findOne(postId);

    // check if the post exists
    if (!post) {
      throw new BadRequestException('Post not found');
    }

    // check if the user is the author of the post
    if (post.authorId !== userId) {
      throw new BadRequestException('You are not the author of this post');
    }

    // update the post
    await post.destroy();

    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: 'Post deleted successfully',
    };
  }
}
