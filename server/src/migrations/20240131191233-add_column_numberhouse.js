"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn("Posts", "numberHouse", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    queryInterface.addColumn("Posts", "longitude", {
      type: Sequelize.DOUBLE,
      allowNull: false,
    });
    queryInterface.addColumn("Posts", "latitude", {
      type: Sequelize.DOUBLE,
      allowNull: false,
    });
   
  },

  async down(queryInterface, Sequelize) {
     queryInterface.removeColumn("numberHouse");
     queryInterface.removeColumn("longitude");
     queryInterface.removeColumn("latitude");
  },
};
