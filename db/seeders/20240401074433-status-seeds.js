"use strict";

let options = {};
const statusSeeds = () => {
  return [
    {
      seeded: true
    },
  ];
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Statuses";
    return queryInterface.bulkInsert(options, statusSeeds(), {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Statuses";
    return queryInterface.bulkDelete(options, null, {});
  },
  statusSeeds,
};
