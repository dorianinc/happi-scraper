"use strict";

let options = {};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "Settings",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        similarityThreshold: {
          allowNull: false,
          type: Sequelize.INTEGER,
          defaultValue: 80,
        },
        filterLimit: {
          allowNull: false,
          type: Sequelize.INTEGER,
          defaultValue: 5,
        },
        selectAll: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },
        selectHighest: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        darkMode: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      options
    );
  },
  down: async (queryInterface, Sequelize) => {
    options.tableName = "Settings";
    await queryInterface.dropTable(options);
  },
};
