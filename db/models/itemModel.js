"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      Item.belongsTo(models.Website, { foreignKey: "websiteName" });
    }
  }

  Item.init(
    {
      websiteName: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      index: {
        type: DataTypes.INTEGER,
      },
      headerLocation: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      urlLocation: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      imageLocation: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      priceLocation: {
        type: DataTypes.STRING,
      },
      dollarLocation: {
        type: DataTypes.STRING,
      },
      centLocation: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Item",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      }
    }
  );

  return Item;
};
