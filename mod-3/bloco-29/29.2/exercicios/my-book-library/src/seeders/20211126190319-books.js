'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Books',
    [
      {
        id: 1,
        title: 'Name of the Wind, The',
        author: 'Patrick Rothfuss',
        page_quantity: 662,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        id: 2,
        title: 'Wise Man\'s Fear, The',
        author: 'Patrick Rothfuss',
        page_quantity: null,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        id: 3,
        title: 'Pragmatic Programmer, The',
        author: 'David Thomas & Andrew Hunt',
        page_quantity: 320,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        id: 4,
        title: 'Clean Code',
        author: 'Robert C. Martin',
        page_quantity: 431,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        id: 5,
        title: 'Clean Coder, The',
        author: 'Robert C. Martin',
        page_quantity: null,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        id: 6,
        title: 'Clean Architecture',
        author: 'Robert C. Martin',
        page_quantity: null,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Books', null, {});
  }
};
