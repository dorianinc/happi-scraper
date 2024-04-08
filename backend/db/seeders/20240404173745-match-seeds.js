"use strict";
const { faker } = require('@faker-js/faker');
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Matches";

    // Fetching product IDs
    const products = await queryInterface.sequelize.query('SELECT id from "Products"');
    const productIds = products[0].map(product => product.id);

    let matchesData = [];

    productIds.forEach(productId => {
      for (let i = 0; i < 3; i++) {
        matchesData.push({
          productId: productId,
          name: faker.commerce.productName(),
          imgSrc: faker.image.urlLoremFlickr({ category: 'abstract' }), // 'https://loremflickr.com/640/480/city'
          url: faker.internet.url(),
          price: faker.number.int({ min: 10, max: 100 }) , // generates a number between 50.00 and 100.00
          websiteName: faker.company.buzzPhrase(),
          similarityRating: faker.number.int({ min: 10, max: 100 }) ,
          excluded: false,
        });
      }
    });

    return queryInterface.bulkInsert(options, matchesData, {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Matches";
    return queryInterface.bulkDelete(options, null, {});
  },
};