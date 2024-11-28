"use strict";

let options = {};

const coordinateClickSeeds = () => {
  return [
    // Ebay
    {
      id: 1,
      x1: 867864.67,
      x2: 54665.76,
      y1: 247899.89,
      y2: 123545.76,
      scriptItemId: 6,
      step: 1,
    },
    {
      id: 2,
      x1: 23324432.32,
      x2: 676574.45,
      y1: 234634.64,
      y2: 876865.65,
      scriptItemId: 6,
      step: 2,
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
