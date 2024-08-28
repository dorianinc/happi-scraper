"use strict";

let options = {};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "Items",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        websiteName: {
          allowNull: false,
          type: Sequelize.STRING,
          references: {
            model: "Websites",
            key: "name",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        index: {
          type: Sequelize.INTEGER,
        },
        headerLocation: {
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
          type: Sequelize.STRING,
        },
        dollarLocation: {
          type: Sequelize.STRING,
        },
        centLocation: {
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
    options.tableName = "Items";
    await queryInterface.dropTable(options);
  },
};
