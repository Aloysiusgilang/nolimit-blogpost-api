'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'posts',
      [
        {
          content: 'This is my first blog post by Gilang.',
          authorId: 1, // Assuming the user with ID 1 already exists
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: 'This is another post by Gilang.',
          authorId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('posts', null, {});
  },
};
