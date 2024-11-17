"use strict";

let options = {};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "Clicks",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        actionId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "Actions",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        delay: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
        locator: {
          type: Sequelize.STRING,
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
        isPositional: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
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
    options.tableName = "Clicks";
    await queryInterface.dropTable(options);
  },
};
