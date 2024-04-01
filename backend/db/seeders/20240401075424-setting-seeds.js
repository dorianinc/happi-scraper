'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Settings";
    return queryInterface.bulkInsert(
      options,
      [
        {
          SimilarityThreshold: 80,
         filterLimit: 5,
          selectAll: true,
          selectHigheset: true,
          darkMode: false
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Settings";
    return queryInterface.bulkDelete(options, null, {});
  }
};
