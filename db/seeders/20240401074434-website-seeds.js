"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const websiteSeeds = () => {
  return [
    {
      name: "AAA Anime",
      url: "https://AAAanime.com",
      searchBarLocation: null,
      excluded: true,
    },
    {
      name: "Amazon",
      url: "https://www.amazon.com",
      searchBarLocation: "input[name='field-keywords']",
      excluded: false,
    },
    {
      name: "Big Bad Toy Store",
      url: "https://bigbadtoystore.com",
      searchBarLocation: null,
      excluded: true,
    },
    {
      name: "Crunchyroll",
      url: "https://store.crunchyroll.com",
      searchBarLocation:
        "input[placeholder='Search apparel, figures, and more']",
      excluded: false,
    },
    {
      name: "eBay",
      url: "https://www.ebay.com",
      searchBarLocation: "input[placeholder='Search for anything']",
      excluded: false,
    },
    {
      name: "Entertainment Earth",
      url: "https://entertainmentearth.com",
      searchBarLocation: null,
      excluded: true,
    },
    {
      name: "GK Figure Worldwide",
      url: "https://gkfigureworldwide.com",
      searchBarLocation: null,
      excluded: true,
    },
    {
      name: "HLJ",
      url: "https://hlj.com",
      searchBarLocation: null,
      excluded: true,
    },
    {
      name: "Japan Figure",
      url: "https://japan-figure.com",
      searchBarLocation: "input[placeholder='What are you looking for?']",
      excluded: false,
    },
    {
      name: "Kotous",
      url: "https://kotous.com",
      searchBarLocation: "input[placeholder='Enter keywords to search...']",
      excluded: false,
    },
    {
      name: "Otaku Mode",
      url: "https://otakumode.com",
      searchBarLocation: "input[placeholder='Search Products...']",
      excluded: false,
    },
    {
      name: "Solaris Japan",
      url: "https://solarisjapan.com",
      searchBarLocation: null,
      excluded: true,
    },
    {
      name: "Super Anime Store",
      url: "https://superanimestore.com",
      searchBarLocation: "#Search-In-Modal-1",
      excluded: false,
    },
  ];
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Websites";
    return queryInterface.bulkInsert(options, websiteSeeds(), {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Websites";
    return queryInterface.bulkDelete(options, null, {});
  },
  websiteSeeds
};
