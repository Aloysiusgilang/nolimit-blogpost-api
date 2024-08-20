import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Dialect } from 'sequelize/types';
import { User } from './user/model/user.model';
import { Post } from './post/model/post.model';

export const sequelizeConfig: SequelizeModuleOptions = {
  dialect: 'mysql' as Dialect,
  host: process.env.DB_HOST || 'localhost',
  port: +process.env.DB_PORT || 3306,
  username: process.env.DB_USERNAME || 'dbgilang',
  password: process.env.DB_PASSWORD || 'Aloyranger141',
  database: process.env.DB_NAME || 'dev_nolimit',
  autoLoadModels: true,
  synchronize: false,
  models: [User, Post], //
};
