"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class WaitTimeout extends Model {
    static associate(models) {
      WaitTimeout.belongsTo(models.ScriptItem, {
        foreignKey: "scriptItemId",
      });
    }
  }

  WaitTimeout.init(
    {
      scriptItemId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      seconds: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "WaitTimeout",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    }
  );

  return WaitTimeout;
};
