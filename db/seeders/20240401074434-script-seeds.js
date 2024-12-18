"use strict";

let options = {};

const scriptSeeds = () => {
  return [
    {
      siteName: "AAA Anime",
      siteUrl: "https://AAAanime.com",
      productTitleLocator: null,
      productUrlLocator: null,
      productImageLocator: null,
      productPriceLocator: null,
      isExcluded: true,
    },
    {
      siteName: "Amazon",
      siteUrl: "https://www.amazon.com",
      productTitleLocator: ".s-title-instructions-style .a-color-base.a-text-normal",
      productUrlLocator: ".a-link-normal.s-no-outline",
      productImageLocator: ".s-product-image-container .s-image",
      productDollarLocator: ".a-price-whole",
      productCentLocator: ".a-price-fraction",
      isExcluded: true,
    },
    {
      siteName: "Big Bad Toy Store",
      siteUrl: "https://bigbadtoystore.com",
      productTitleLocator: null,
      productUrlLocator: null,
      productImageLocator: null,
      productDollarLocator: ".price-integer",
      productCentLocator: ".price-integer",
      isExcluded: true,
    },
    {
      siteName: "Crunchyroll",
      siteUrl: "https://store.crunchyroll.com",
      productTitleLocator: ".pdp-link",
      productUrlLocator: ".image-tile-container",
      productImageLocator: ".tile-image",
      productPriceLocator: ".sales .value",
      isExcluded: true,
    },
    {
      siteName: "eBay",
      siteUrl: "https://www.ebay.com",
      productTitleLocator: ".srp-results .s-item__title",
      productUrlLocator: ".srp-results .s-item__image a",
      productImageLocator: ".srp-results .s-item__image img",
      productPriceLocator: ".srp-results .s-item__price",
      isExcluded: false,
    },
    {
      siteName: "Entertainment Earth",
      siteUrl: "https://entertainmentearth.com",
      productTitleLocator: null,
      productUrlLocator: null,
      productImageLocator: null,
      productPriceLocator: null,
      isExcluded: true,
    },
    {
      siteName: "GK Figure Worldwide",
      siteUrl: "https://gkfigureworldwide.com",
      productTitleLocator: null,
      productUrlLocator: null,
      productImageLocator: null,
      productPriceLocator: null,
      isExcluded: true,
    },
    {
      siteName: "HLJ",
      siteUrl: "https://hlj.com",
      productTitleLocator: null,
      productUrlLocator: null,
      productImageLocator: null,
      productPriceLocator: null,
      isExcluded: true,
    },
    {
      siteName: "Japan Figure",
      siteUrl: "https://japan-figure.com",
      productTitleLocator: ".productitem--title",
      productUrlLocator: ".productitem--image-link",
      productImageLocator: ".productitem--image-primary",
      productPriceLocator: ".price__current .money",
      isExcluded: true,
    },
    {
      siteName: "Kotous",
      siteUrl: "https://kotous.com",
      productTitleLocator: ".product-item-link",
      productUrlLocator: ".product-item-link",
      productImageLocator: ".product-image-photo",
      productPriceLocator: ".price-final_price .price",
      isExcluded: true,
    },
    {
      siteName: "Otaku Mode",
      siteUrl: "https://otakumode.com",
      productTitleLocator: ".p-product-list__title",
      productUrlLocator: ".p-product-list__title",
      productImageLocator: ".p-product-list__item img",
      productPriceLocator: ".p-price__regular",
      isExcluded: true,
    },
    {
      siteName: "Solaris Japan",
      siteUrl: "https://solarisjapan.com",
      productTitleLocator: ".title",
      productUrlLocator: null,
      productImageLocator: null,
      productPriceLocator: ".product-submit__btn--red .money",
      isExcluded: true,
    },
    {
      siteName: "Super Anime Store",
      siteUrl: "https://superanimestore.com",
      productTitleLocator: ".h5 .full-unstyled-link",
      productUrlLocator: ".card__information a",
      productImageLocator: ".card__media .motion-reduce",
      productPriceLocator: ".price-item--regular",
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
