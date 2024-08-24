"use strict";

let options = {};
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "Statuses",
      {
        id: {
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.INTEGER,
        },
        seeded: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
          defaultValue: true
        },
      },
      options
    );
  },
  down: async (queryInterface, Sequelize) => {
    options.tableName = "Statuses";
    await queryInterface.dropTable(options);
  },
};