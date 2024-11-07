"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Script extends Model {
    static associate(models) {
      Script.hasMany(models.Action, { foreignKey: "siteName" });
    }
  }
  Script.init(
    {
      siteName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      url: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      searchFieldLocation: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      titleLocation: {
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
      isExcluded: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
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
