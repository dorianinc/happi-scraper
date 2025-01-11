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
        siteUrl: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        searchFieldLocator: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        productTitleLocator: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        productUrlLocator: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        productImageLocator: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        productPriceLocator: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        productDollarLocator: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        productCentLocator: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        isExcluded: {
          allowNull: false,
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
