"use strict";

let options = {};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "Positions",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        clickId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "Clicks",
          },
          onDelete: "CASCADE",
        },
        top: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        left: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        height: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        width: {
          allowNull: false,
          type: Sequelize.INTEGER,
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
    options.tableName = "Positions";
    await queryInterface.dropTable(options);
  },
};
