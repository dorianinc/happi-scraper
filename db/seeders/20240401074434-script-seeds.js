"use strict";

let options = {};

const scriptSeeds = () => {
  return [
    {
      siteName: "AAA Anime",
      url: "https://AAAanime.com",
      titleLocation: null,
      urlLocation: null,
      imageLocation: null,
      priceLocation: null,
      isExcluded: true,
    },
    {
      siteName: "Amazon",
      url: "https://www.amazon.com",
      titleLocation: ".s-title-instructions-style .a-color-base.a-text-normal",
      urlLocation: ".a-link-normal.s-no-outline",
      imageLocation: ".s-product-image-container .s-image",
      dollarLocation: ".a-price-whole",
      centLocation: ".a-price-fraction",
      isExcluded: false,
    },
    {
      siteName: "Big Bad Toy Store",
      url: "https://bigbadtoystore.com",
      titleLocation: null,
      urlLocation: null,
      imageLocation: null,
      dollarLocation: ".price-integer",
      centLocation: ".price-integer",
      isExcluded: true,
    },
    {
      siteName: "Crunchyroll",
      url: "https://store.crunchyroll.com",
      titleLocation: ".pdp-link",
      urlLocation: ".image-tile-container",
      imageLocation: ".tile-image",
      priceLocation: ".sales .value",
      isExcluded: true,
    },
    {
      siteName: "eBay",
      url: "https://www.ebay.com",
      titleLocation: ".srp-results .s-item__title",
      urlLocation: ".srp-results .s-item__image a",
      imageLocation: ".srp-results .s-item__image img",
      priceLocation: ".srp-results .s-item__price",
      isExcluded: true,
    },
    {
      siteName: "Entertainment Earth",
      url: "https://entertainmentearth.com",
      titleLocation: null,
      urlLocation: null,
      imageLocation: null,
      priceLocation: null,
      isExcluded: true,
    },
    {
      siteName: "GK Figure Worldwide",
      url: "https://gkfigureworldwide.com",
      titleLocation: null,
      urlLocation: null,
      imageLocation: null,
      priceLocation: null,
      isExcluded: true,
    },
    {
      siteName: "HLJ",
      url: "https://hlj.com",
      titleLocation: null,
      urlLocation: null,
      imageLocation: null,
      priceLocation: null,
      isExcluded: true,
    },
    {
      siteName: "Japan Figure",
      url: "https://japan-figure.com",
      titleLocation: ".productitem--title",
      urlLocation: ".productitem--image-link",
      imageLocation: ".productitem--image-primary",
      priceLocation: ".price__current .money",
      isExcluded: true,
    },
    {
      siteName: "Kotous",
      url: "https://kotous.com",
      titleLocation: ".product-item-link",
      urlLocation: ".product-item-link",
      imageLocation: ".product-image-photo",
      priceLocation: ".price-final_price .price",
      isExcluded: true,
    },
    {
      siteName: "Otaku Mode",
      url: "https://otakumode.com",
      titleLocation: ".p-product-list__title",
      urlLocation: ".p-product-list__title",
      imageLocation: ".p-product-list__item img",
      priceLocation: ".p-price__regular",
      isExcluded: true,
    },
    {
      siteName: "Solaris Japan",
      url: "https://solarisjapan.com",
      titleLocation: ".title",
      urlLocation: null,
      imageLocation: null,
      priceLocation: ".product-submit__btn--red .money",
      isExcluded: true,
    },
    {
      siteName: "Super Anime Store",
      url: "https://superanimestore.com",
      titleLocation: ".h5 .full-unstyled-link",
      urlLocation: ".card__information a",
      imageLocation: ".card__media .motion-reduce",
      priceLocation: ".price-item--regular",
      isExcluded: true,
    },
  ];
  
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Scripts";
    return queryInterface.bulkInsert(options, scriptSeeds(), {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Scripts";
    return queryInterface.bulkDelete(options, null, {});
  },
  scriptSeeds,
};
