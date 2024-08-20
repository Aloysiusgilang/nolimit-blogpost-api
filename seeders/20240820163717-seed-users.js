'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: 1,
          name: 'Gilang Pramudya',
          email: 'gilangpramdya@example.com',
          password:
            '$2a$10$9ZQvb5IUnpkpgUGcJDHgk.VU5vSszmq2u4RrHQ5teSh4quQ3KR2hW', // password
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  },
};
