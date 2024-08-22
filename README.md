## Description

this is a simple blog sevice built with nestjs, sequelize, and mysql. It has the following features:

- user authentication
- create, read, update, and delete posts
- basic security features like rate limiting, cors, and helmet
- api documentation with swagger

## Project setup

```bash
$ npm install
```

## Databases etup

- make sure you have mysql installed on your machine locally or via docker
- create a new .env file from the env.example and fill in the required field
- create the database in mysql if it does not exist via the command below or via sequelize-cli

```bash
$ mysql -u root -p
$ CREATE DATABASE IF NOT EXISTS `database_name`;
```

OR

```bash
$ npx sequelize-cli db:create
```

- run the migration to create the tables in the database

```bash
$ npx sequelize-cli db:migrate
```

- run the seed to populate the tables with some data

```bash
$ npx sequelize-cli db:seed:all
```

## Compile and run the project

```bash
$ npm run start
```

## API Documentation (Swagger)

- The API documentation can be found at [http://localhost:3000/api](http://localhost:3000/api)
- The postman collection can be found in the `postman` folder

## Authentication

To access the authenticated endpoints (e.g., create, update, and delete posts), you must first log in and obtain a JWT token. Use this token as a Bearer token in the `Authorization` header of subsequent requests.
