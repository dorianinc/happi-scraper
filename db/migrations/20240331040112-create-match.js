"use strict";

let options = {};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "Matches",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        productId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "Products",
          },
          onDelete: 'cascade'
        },      
        name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        imgSrc: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        url: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        price: {
          allowNull: false,
          type: Sequelize.DECIMAL,
        },
        websiteName: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        similarityRating: {
          allowNull: false,
          type: Sequelize.INTEGER,
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
    options.tableName = "Matches";
    await queryInterface.dropTable(options);
  },
};