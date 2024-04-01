"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Setting extends Model {
  }
  Setting.init(
    {
      similarityThreshold: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      filterLimit: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      selectAll: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      selectHighest: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      darkMode: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "Setting",
      defaultScope: {
        attributes: {
          exclude: ["createdAt"],
        },
      },
    }
  );
  return Setting;
};