import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  Sequelize,
} from 'sequelize-typescript';
import { User } from 'src/user/model/user.model';

@Table
export class Post extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column(DataType.TEXT)
  content: string;

  @Column({ defaultValue: Sequelize.fn('NOW') })
  createdAt: Date;

  @Column({ defaultValue: Sequelize.fn('NOW') })
  updatedAt: Date;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  authorId: number;
}
