"use strict";
let options = {};

const delaySeeds = () => {
  return [
    // Kotous
    {
      id: 1,
      locator: null,
      seconds: 5,
      scriptItemId: 11,
      step: 1,
    },
  ];
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Delays";
    return queryInterface.bulkInsert(options, delaySeeds(), {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Delays";
    return queryInterface.bulkDelete(options, null, {});
  },
  delaySeeds,
};
