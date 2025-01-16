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
          allowNull: true,
          unique: true,
          type: Sequelize.STRING,
          defaultValue: "Untitled"
        },
        siteUrl: {
          allowNull: true,
          type: Sequelize.STRING,
          defaultValue: null
        },
        searchFieldLocator: {
          allowNull: true,
          type: Sequelize.STRING,
          defaultValue: null
        },
        productTitleLocator: {
          allowNull: true,
          type: Sequelize.STRING,
          defaultValue: null
        },
        productUrlLocator: {
          allowNull: true,
          type: Sequelize.STRING,
          defaultValue: null
        },
        productImageLocator: {
          allowNull: true,
          type: Sequelize.STRING,
          defaultValue: null
        },
        productPriceLocator: {
          allowNull: true,
          type: Sequelize.STRING,
          defaultValue: null
        },
        productDollarLocator: {
          allowNull: true,
          type: Sequelize.STRING,
          defaultValue: null
        },
        productCentLocator: {
          allowNull: true,
          type: Sequelize.STRING,
          defaultValue: null
        },
        isExcluded: {
          allowNull: true,
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        errorMessage: {
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
    options.tableName = "Scripts";
    await queryInterface.dropTable(options);
  },
};
