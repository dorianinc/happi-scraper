"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class LocatorClick extends Model {
    static associate(models) {
      LocatorClick.belongsTo(models.ScriptItem, {
        foreignKey: "scriptItemId",
      });
    }
  }

  LocatorClick.init(
    {
      scriptItemId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      step: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      locator: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: "LocatorClick",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    }
  );

  return LocatorClick;
};
