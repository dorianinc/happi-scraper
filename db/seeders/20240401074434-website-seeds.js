"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Websites";
    return queryInterface.bulkInsert(
      options,
      [
        {
          name: "AAA Anime",
          url: "https://AAAanime.com",
          searchBarLocator: null,
          headerLocator: null,
          priceLocator: null,
          popUpLocator: null,
          searchButtonLocator: null,
          imageLocator: null,
          urlLocator: null,
          popUpCheck: false,
          filterCheck: false,
          searchButtonCheck: false,
          excluded: true,
        },
        {
          name: "Amazon",
          url: "https://www.amazon.com",
          searchBarLocator: "input[name='field-keywords']",
          headerLocator:
            ".s-title-instructions-style .a-color-base.a-text-normal",
          priceLocator: ".srp-results .s-item__price",
          popUpLocator: null,
          searchButtonLocator: null,
          imageLocator: ".s-product-image-container .s-image",
          urlLocator: ".a-link-normal.s-no-outline",
          popUpCheck: false,
          filterCheck: false,
          searchButtonCheck: false,
          excluded: false,
        },
        {
          name: "Big Bad Toy Store",
          url: "https://bigbadtoystore.com",
          searchBarLocator: null,
          headerLocator: null,
          priceLocator: null,
          popUpLocator: null,
          searchButtonLocator: null,
          imageLocator: null,
          urlLocator: null,
          popUpCheck: false,
          filterCheck: false,
          searchButtonCheck: false,
          excluded: true,
        },
        {
          name: "Crunchyroll",
          url: "https://store.crunchyroll.com",
          searchBarLocator:
            "input[placeholder='Search apparel, figures, and more']",
          headerLocator: ".pdp-link",
          priceLocator: ".sales .value",
          popUpLocator: null,
          searchButtonLocator: null,
          imageLocator: ".tile-image",
          urlLocator: ".image-tile-container",
          popUpCheck: false,
          filterCheck: false,
          searchButtonCheck: false,
          excluded: false,
        },
        {
          name: "eBay",
          url: "https://www.ebay.com",
          searchBarLocator: "input[placeholder='Search for anything']",
          headerLocator: ".srp-results .s-item__title",
          priceLocator: ".srp-results .s-item__price",
          popUpLocator: null,
          searchButtonLocator: null,
          imageLocator: ".srp-results .s-item__image img",
          urlLocator: ".srp-results .s-item__image a",
          popUpCheck: false,
          filterCheck: true,
          searchButtonCheck: false,
          excluded: false,
        },
        {
          name: "Entertainment Earth",
          url: "https://entertainmentearth.com",
          searchBarLocator: null,
          headerLocator: null,
          priceLocator: null,
          popUpLocator: null,
          searchButtonLocator: null,
          imageLocator: null,
          urlLocator: null,
          popUpCheck: false,
          filterCheck: false,
          searchButtonCheck: false,
          excluded: true,
        },
        {
          name: "GK Figure Worldwide",
          url: "https://gkfigureworldwide.com",
          searchBarLocator: null,
          headerLocator: null,
          priceLocator: null,
          popUpLocator: null,
          searchButtonLocator: null,
          imageLocator: null,
          urlLocator: null,
          popUpCheck: false,
          filterCheck: false,
          searchButtonCheck: false,
          excluded: true,
        },
        {
          name: "HLJ",
          url: "https://hlj.com",
          searchBarLocator: null,
          headerLocator: null,
          priceLocator: null,
          popUpLocator: null,
          searchButtonLocator: null,
          imageLocator: null,
          urlLocator: null,
          popUpCheck: false,
          filterCheck: false,
          searchButtonCheck: false,
          excluded: true,
        },
        {
          name: "Japan Figure",
          url: "https://japan-figure.com",
          searchBarLocator: "input[placeholder='What are you looking for?']",
          headerLocator: ".productitem--title",
          priceLocator: ".price__current .money",
          popUpLocator: null,
          searchButtonLocator: null,
          imageLocator: ".productitem--image-primary",
          urlLocator: ".productitem--image-link",
          popUpCheck: false,
          filterCheck: false,
          searchButtonCheck: false,
          excluded: false,
        },
        {
          name: "Kotous",
          url: "https://kotous.com",
          searchBarLocator: "input[placeholder='Enter keywords to search...']",
          headerLocator: ".product-item-link",
          priceLocator: ".price-final_price .price",
          popUpLocator: ".fancybox-close",
          searchButtonLocator: null,
          imageLocator: ".product-image-photo",
          urlLocator: ".product-item-link",
          popUpCheck: false,
          filterCheck: false,
          searchButtonCheck: false,
          excluded: false,
        },
        {
          name: "Otaku Mode",
          url: "https://otakumode.com",
          searchBarLocator: "input[placeholder='Search Products...']",
          headerLocator: ".p-product-list__title",
          priceLocator: ".p-price__regular",
          popUpLocator: null,
          searchButtonLocator: null,
          imageLocator: ".p-product-list__item img",
          urlLocator: ".p-product-list__title",
          popUpCheck: false,
          filterCheck: false,
          searchButtonCheck: false,
          excluded: false,
        },
        {
          name: "Solaris Japan",
          url: "https://solarisjapan.com",
          searchBarLocator: null,
          headerLocator: ".title",
          priceLocator: ".product-submit__btn--red .money",
          popUpLocator: null,
          searchButtonLocator: null,
          imageLocator: null,
          urlLocator: null,
          popUpCheck: false,
          filterCheck: false,
          searchButtonCheck: false,
          excluded: true,
        },
        {
          name: "Super Anime Store",
          url: "https://superanimestore.com",
          searchBarLocator: "#Search-In-Modal-1",
          headerLocator: ".h5 .full-unstyled-link",
          priceLocator: ".price-item--regular",
          popUpLocator: ".privy-x",
          searchButtonLocator: ".icon.icon-search",
          imageLocator: ".card__media .motion-reduce",
          urlLocator: ".card__information a",
          popUpCheck: false,
          filterCheck: false,
          searchButtonCheck: true,
          excluded: false,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Websites";
    return queryInterface.bulkDelete(options, null, {});
  },
};