import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { Post } from 'src/post/model/post.model';

@Table
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  password: string;

  @HasMany(() => Post)
  posts: Post[];
}
