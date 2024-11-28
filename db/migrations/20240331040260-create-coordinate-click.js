"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("CoordinateClicks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      scriptItemId:{
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
      x1: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      x2: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      y1: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      y2: {
        allowNull: false,
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable("CoordinateClicks");
  },
};
