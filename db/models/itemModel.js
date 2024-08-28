"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      Item.belongsTo(models.Website);
    }
  }

  Item.init(
    {
      websiteName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      index: {
        type: DataTypes.INTEGER,
      },
      headerLocation: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      urlLocation: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      imageLocation: {
        allowNull: true,
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
