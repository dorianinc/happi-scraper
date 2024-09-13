"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Action extends Model {
    static associate(models) {
      Action.belongsTo(models.SearchTarget, { foreignKey: "siteName" });
      Action.hasMany(models.Click, { foreignKey: "actionId" });
    }
  }

  Action.init(
    {
      siteName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      order: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      type: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Action",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      }
    }
  );

  return Action;
};
