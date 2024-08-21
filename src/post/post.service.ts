import { BadRequestException, Injectable } from '@nestjs/common';
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

  async create(userId: number, createPostDto: CreatePostDto): Promise<Post> {
    const newPost = await this.postModel.create({
      authorId: userId,
      ...createPostDto,
    });
    return newPost;
  }

  async update(
    userId: number,
    postId: number,
    updatePostDto: UpdatePostDto,
  ): Promise<Post> {
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

    return post;
  }

  async remove(userId: number, postId: number): Promise<Post> {
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

    return post;
  }
}
