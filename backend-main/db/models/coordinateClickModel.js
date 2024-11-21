"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CoordinateClick extends Model {
    static associate(models) {
      CoordinateClick.belongsTo(models.ScriptItem, {
        foreignKey: "scriptItemId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  CoordinateClick.init(
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
      x1: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      x2: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      y1: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      y2: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
    },
    {
      sequelize,
      modelName: "CoordinateClick",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      }
    }
  );

  return CoordinateClick;
};
