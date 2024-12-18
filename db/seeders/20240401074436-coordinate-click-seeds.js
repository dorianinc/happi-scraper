"use strict";

let options = {};

const coordinateClickSeeds = () => {
  return [
    // Ebay
    {
      id: 1,
      x1: 125,
      x2: 32,
      y1: 747.03125,
      y2: 32,
      scriptItemId: 6,
      step: 1,
    },
    {
      id: 2,
      x1: 464.921875,
      x2: 112.296875,
      y1: 200,
      y2: 32,
      scriptItemId: 6,
      step: 2,
    },
    {
      id: 3,
      x1: 480.921875,
      x2: 18,
      y1: 281,
      y2: 18,
      scriptItemId: 6,
      step: 3,
    },
  ];
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "CoordinateClicks";
    return queryInterface.bulkInsert(options, coordinateClickSeeds(), {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "CoordinateClicks";
    return queryInterface.bulkDelete(options, null, {});
  },
  coordinateClickSeeds,
};
