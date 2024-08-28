"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const itemSeeds = () => {
  return [
    {
      websiteName: "AAA Anime",
      headerLocation: null,
      urlLocation: null,
      imageLocation: null,
      priceLocation: null,

    },
    {
      websiteName: "Amazon",
      headerLocation: ".s-title-instructions-style .a-color-base.a-text-normal",
      urlLocation: ".a-link-normal.s-no-outline",
      imageLocation: ".s-product-image-container .s-image",
      priceLocation: ".srp-results .s-item__price",
    },
    {
      websiteName: "Big Bad Toy Store",
      headerLocation: null,
      urlLocation: null,
      imageLocation: null,
      priceLocation: null,
    },
    {
      websiteName: "Crunchyroll",
      headerLocation: ".pdp-link",
      urlLocation: ".image-tile-container",
      imageLocation: ".tile-image",
      priceLocation: ".sales .value",
    },
    {
      websiteName: "eBay",
      headerLocation: ".srp-results .s-item__title",
      urlLocation: ".srp-results .s-item__image a",
      imageLocation: ".srp-results .s-item__image img",
      priceLocation: ".srp-results .s-item__price",
    },
    {
      websiteName: "Entertainment Earth",
      headerLocation: null,
      urlLocation: null, 
      imageLocation: null,
      priceLocation: null,
    },
    {
      websiteName: "GK Figure Worldwide",
      headerLocation: null,
      urlLocation: null,
      imageLocation: null,
      priceLocation: null,
    },
    {
      websiteName: "HLJ",
      headerLocation: null,
      urlLocation: null,
      imageLocation: null,
      priceLocation: null,
    },
    {
      websiteName: "Japan Figure",
      headerLocation: ".productitem--title",
      urlLocation: ".productitem--image-link",
      imageLocation: ".productitem--image-primary",
      priceLocation: ".price__current .money",
    },
    {
      websiteName: "Kotous",
      headerLocation: ".product-item-link",
      urlLocation: ".product-item-link",
      imageLocation: ".product-image-photo",
      priceLocation: ".price-final_price .price",
    },
    {
      websiteName: "Otaku Mode",
      headerLocation: ".p-product-list__title",
      urlLocation: ".p-product-list__title",
      imageLocation: ".p-product-list__item img",
      priceLocation: ".p-price__regular",
    },
    {
      websiteName: "Solaris Japan",
      headerLocation: ".title",
      urlLocation: null,
      imageLocation: null,
      priceLocation: ".product-submit__btn--red .money",
    },
    {
      websiteName: "Super Anime Store",
      headerLocation: ".h5 .full-unstyled-link",
      urlLocation: ".card__information a",
      imageLocation: ".card__media .motion-reduce",
      priceLocation: ".price-item--regular",
    },
  ];
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Items";
    return queryInterface.bulkInsert(options, itemSeeds(), {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Items";
    return queryInterface.bulkDelete(options, null, {});
  },
  itemSeeds
};
