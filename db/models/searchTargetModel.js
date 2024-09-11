"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class SearchTarget extends Model {
    static associate(models) {
      SearchTarget.hasMany(models.Action, { foreignKey: "siteName" });
    }
  }
  SearchTarget.init(
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
      linkLocation: {
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
      modelName: "SearchTarget",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    }
  );

  return SearchTarget;
};
