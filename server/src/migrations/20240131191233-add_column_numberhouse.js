"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn("Posts", "numberHouse", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    queryInterface.addColumn("Posts", "longitude", {
      type: Sequelize.DOUBLE,
      allowNull: true,
    });
    queryInterface.addColumn("Posts", "latitude", {
      type: Sequelize.DOUBLE,
      allowNull: true,
    });
   
  },

  async down(queryInterface, Sequelize) {
     queryInterface.removeColumn("numberHouse");
     queryInterface.removeColumn("longitude");
     queryInterface.removeColumn("latitude");
  },
};
