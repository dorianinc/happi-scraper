"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("Delays", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      scriptItemId: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: "ScriptItems",
          key: "id",
        },
        onDelete: "cascade",
      },
      step: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      locator: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      seconds: {
        allowNull: true,
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
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Delays");
  },
};
