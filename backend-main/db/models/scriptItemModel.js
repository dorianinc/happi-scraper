"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ScriptItem extends Model {
    static associate(models) {
      ScriptItem.belongsTo(models.Script, { foreignKey: "siteName" });
      ScriptItem.hasMany(models.Click, { foreignKey: "scriptItemId" });
    }
  }

  ScriptItem.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,  
      },
      siteName: { //links to site
        allowNull: false,
        type: DataTypes.STRING,
      },
      step: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      type: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      value: {
        allowNull: false,
        type: DataTypes.STRING,
      }
    },
    {
      sequelize,
      modelName: "ScriptItem",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      }
    }
  );

  return ScriptItem;
};
