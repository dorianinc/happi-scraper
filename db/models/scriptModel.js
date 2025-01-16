"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Script extends Model {
    static associate(models) {
      Script.hasMany(models.ScriptItem, { foreignKey: "scriptId" });
    }
  }
  Script.init(
    {
      siteName: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      siteUrl: {
        allowNull: true,
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
        allowNull: true,
        type: DataTypes.STRING,
      },
      productDollarLocator: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      productCentLocator: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      isExcluded: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
      },
      errorMessage: {
        allowNull: true,
        type: DataTypes.STRING,
      },
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