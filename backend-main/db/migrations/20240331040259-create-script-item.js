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
          type: Sequelize.UUID,  
        },
        siteName: {
          allowNull: false,
          type: Sequelize.STRING,
          references: {
            model: "Scripts",
            key: "siteName",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        step: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        type: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        value: {
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
