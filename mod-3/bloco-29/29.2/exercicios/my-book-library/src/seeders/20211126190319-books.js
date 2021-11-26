'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Books',
    [
      {
        id: 1,
        title: 'Name of the Wind, The',
        author: 'Patrick Rothfuss',
        pageQuantity: 662,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        id: 2,
        title: 'Wise Man\'s Fear, The',
        author: 'Patrick Rothfuss',
        pageQuantity: null,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        id: 3,
        title: 'Pragmatic Programmer, The',
        author: 'David Thomas & Andrew Hunt',
        pageQuantity: 320,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        id: 4,
        title: 'Clean Code',
        author: 'Robert C. Martin',
        pageQuantity: 431,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        id: 5,
        title: 'Clean Coder, The',
        author: 'Robert C. Martin',
        pageQuantity: null,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        id: 6,
        title: 'Clean Architecture',
        author: 'Robert C. Martin',
        pageQuantity: null,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Books', null, {});
  }
};
