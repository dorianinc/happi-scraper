"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Action extends Model {
    static associate(models) {
      Action.hasMany(models.Match, { foreignKey: "actionId" });
    }
  }
  Action.init(
    {
      type: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      value: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      byPositon: {
        
      }
    },
    {
      sequelize,
      modelName: "Action",
      defaultScope: {
        attributes: {
          exclude: ["updatedAt"],
        },
      },
    }
  );
  return Action;
};