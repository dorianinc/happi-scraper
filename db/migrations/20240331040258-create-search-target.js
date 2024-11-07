"use strict";

let options = {};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "Scripts",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        siteName: {
          allowNull: false,
          unique: true,
          type: Sequelize.STRING,
        },
        url: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        searchFieldLocation: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        titleLocation: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        urlLocation: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        imageLocation: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        priceLocation: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        dollarLocation: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        centLocation: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        isExcluded: {
          allowNull: false,
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
    options.tableName = "Scripts";
    await queryInterface.dropTable(options);
  },
};
