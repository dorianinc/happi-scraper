"use strict";

let options = {};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "ScriptItems",
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING,
        },
        siteName: {
          allowNull: false,
          type: Sequelize.STRING,
          references: {
            model: "Scripts",
            key: "siteName",
          },
          onDelete: "cascade",
          onUpdate: "cascade",
        },
        type: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        step: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        startUrl: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        endUrl: {
          allowNull: true,
          type: Sequelize.STRING,
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
    options.tableName = "ScriptItems";
    await queryInterface.dropTable(options);
  },
};
