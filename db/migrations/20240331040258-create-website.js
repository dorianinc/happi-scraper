"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "Websites",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        url: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        headerLocator: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        imageLocator: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        priceLocator: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        popUpLocator: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        searchBarLocator: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        searchButtonLocator: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        urlLocator: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        filterCheck: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        popUpCheck: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        searchButtonCheck: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        excluded: {
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
    options.tableName = "Websites";
    await queryInterface.dropTable(options);
  },
};