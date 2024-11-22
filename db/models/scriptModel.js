"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Script extends Model {
    static associate(models) {
      Script.hasMany(models.ScriptItem, { foreignKey: "siteName" });
    }
  }
  Script.init(
    {
      siteName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      siteUrl: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      searchFieldLocator: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      productTitleLocator: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      productUrlLocator: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      productImageLocator: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      productPriceLocator: {
        type: DataTypes.STRING,
      },
      productDollarLocator: {
        type: DataTypes.STRING,
      },
      productCentLocator: {
        type: DataTypes.STRING,
      },
      isExcluded: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      }
    },
    {
      sequelize,
      modelName: "Script",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    }
  );

  return Script;
};