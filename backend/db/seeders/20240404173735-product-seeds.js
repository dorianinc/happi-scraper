"use strict";
const { faker } = require('@faker-js/faker');

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Products";

    let productsData = Array.from({ length: 10 }).map(() => ({
      name: faker.commerce.productName(),
      imgSrc: null,
      avgPrice: faker.number.float({ min: 20, max: 100 }), // generates a number between 50.00 and 100.00
    }));

    return queryInterface.bulkInsert(options, productsData, {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Products";
    return queryInterface.bulkDelete(options, null, {});
  },
};