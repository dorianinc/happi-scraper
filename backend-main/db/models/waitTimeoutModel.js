"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class WaitTimeout extends Model {
    static associate(models) {
      WaitTimeout.belongsTo(models.ScriptItem, {
        foreignKey: "scriptItemId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  WaitTimeout.init(
    {
      scriptItemId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: "ScriptItems",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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
      timestamps: true, // Enables createdAt and updatedAt
    }
  );

  return WaitTimeout;
};
