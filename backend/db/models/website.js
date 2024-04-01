"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Website extends Model {
  }
  Website.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      url: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      headerLocator: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      imageLocator: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      priceLocator: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      popUpLocator: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      searchBarLocator: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      searchButtonLocator: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      urlLocator: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      filterCheck: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      popUpCheck: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      searchButtonCheck: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      excluded: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "Website",
      defaultScope: {
        attributes: {
          exclude: ["createdAt"],
        },
      },
    }
  );
  return Website;
};