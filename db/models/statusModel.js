"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    static associate(models) {
      // associations go here
    }
  }
  Status.init(
    {
      seeded: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "Status",
    }
  );
  return Status;
};
