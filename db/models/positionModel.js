"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Position extends Model {
    static associate(models) {
      Position.belongsTo(models.Click, { foreignKey: "clickId" });
    }
  }

  Position.init(
    {
      clickId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      top: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      left: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      height: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      width: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Position",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      }
    }
  );

  return Position;
};
