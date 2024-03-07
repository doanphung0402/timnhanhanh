'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Posts', 'isAccept', {
      type: Sequelize.BOOLEAN,
      allowNull: true, // Tùy thuộc vào yêu cầu của bạn
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Posts',
      'isAccept'
  );
  }
};
