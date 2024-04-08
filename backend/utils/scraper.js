const { Match, Website, Setting } = require("../db/models/index.js");
const { calculateSimilarity } = require("../utils/helpers.js");
const { chromium } = require("playwright");

const USER_AGENT_STRINGS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
];

const closePopUp = async (website, page) => {
  try {
    await page.waitForTimeout(1000);
    await page.locator(website.popUpLocator).click();
  } catch (error) {
    console.error("Error in closePopUp:\n", error);
  }
};

const clickSearchButton = async (website, page) => {
  try {
    await page.locator(website.searchButtonLocator).nth(0).click();
  } catch (error) {
    console.error("Error in clickSearchButton:\n", error);
  }
};

const calculateAverage = (prices) => {
  const total = prices.reduce((acc, curr) => acc + curr, 0);
  const average = total / prices.length;
  return average.toFixed(2);
};

const filterResults = async (page) => {
  try {
    await page.locator("li").filter({ hasText: "Buy It Now" }).nth(3).click();
    await page
      .locator("#mainContent")
      .getByRole("button", { name: "Condition" })
      .click();
    await page
      .getByRole("link", { name: "Any Condition - Filter Applied" })
      .click();
    await page.getByRole("link", { name: "New", exact: true }).click();
  } catch (error) {
    console.error("Error in filterResults:\n", error);
  }
};

const filterMatches = async (product, website, page, settings) => {
  const prices = [];
  let matchFound = false;
  // try {
  const header = await page.locator(website.headerLocator);
  console.log("🖥️  header: ", header);
  const headerText = await header.nth(0).innerText();
  // console.log("🖥️  headerText: ", headerText)
  // const isVisible = await header.nth(0).isVisible();
  const isVisible = true;
  // console.log("🖥️  isVisible: ", isVisible);

  if (isVisible) {
    const resultsLength = await header.count();
    console.log("🖥️  resultsLength: ", resultsLength);
    const limit = Math.min(resultsLength, settings.filterLimit);
    console.log("🖥️  limit: ", limit);

    for (let index = 0; index < limit; index++) {
      const websiteProductName = await header.nth(index).innerText();
      console.log("🖥️  websiteProductName: ", websiteProductName);
      const similarityRating = calculateSimilarity(
        product.name,
        websiteProductName
      );
      console.log("🖥️  similarityRating: ", similarityRating);

      if (similarityRating > settings.similarityThreshold) {
        matchFound = true;
        const price = await getPrice(website, page, index);
        prices.push(price);

        const newMatch = {
          name: websiteProductName,
          imgSrc: await getImage(website, page, index),
          url: await getUrl(website, page, index),
          price: price,
          websiteName: website.name,
          similarityRating: similarityRating,
          excluded: false,
          productId: product.id,
        };

        await Match.create(newMatch);
        // console.log("🖥️  match: ", newMatch);
      }
    }
    if (matchFound) {
      console.log("🖥️  prices: ", prices);
      return prices;
    }
  }
  // } catch (error) {
  //   console.log(`No results found for ${product.name} in ${website.name}`);
  // }
};

const getPrice = async (website, page, index) => {
  let price;
  if (website.name === "Amazon") {
    const dollar = await page.locator(".a-price-whole").nth(index).innerText();
    const cent = await page.locator(".a-price-fraction").nth(index).innerText();
    price = parseFloat(`${dollar}${cent}`);
  } else if (website.name === "Big Bad Toy Store") {
    const dollar = await page.locator(".price-integer").nth(index).innerText();
    const cent = await page.locator(".price-decimal").nth(index).innerText();
    price = parseFloat(`${dollar}.${cent}`);
  } else {
    const priceText = await page
      .locator(website.priceLocator)
      .nth(index)
      .innerText();
    price = parseFloat(priceText.replace("$", ""));
  }
  return price;
};

const getImage = async (website, page, index) => {
  try {
    let imgSrc = await page
      .locator(website.imageLocator)
      .nth(index)
      .getAttribute("src");
    if (website.name === "Super Anime Store") {
      imgSrc = "https:" + imgSrc;
    }
    return imgSrc;
  } catch (error) {
    console.error("Error in getImage:\n", error);
  }
};

const getUrl = async (website, page, index) => {
  try {
    let url = await page
      .locator(website.urlLocator)
      .nth(index)
      .getAttribute("href");
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = website.url + url;
    }
    return url;
  } catch (error) {
    console.error("Error in getUrl:\n", error);
  }
};

const getPage = async (url, browser) => {
  const userAgents =
    USER_AGENT_STRINGS[Math.floor(Math.random() * USER_AGENT_STRINGS.length)];
  const context = await browser.newContext({ userAgent: userAgents });
  await context.addInitScript(
    "Object.defineProperty(navigator, 'webdriver', {get: () => undefined})"
  );
  const page = await context.newPage();
  await page.goto(url);
  return page;
};

const searchWebsite = async (product, website, settings) => {
  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  const page = await getPage(website.url, browser);

  try {
    if (website.popUpCheck) await closePopUp(website, page);
    if (website.searchButtonCheck) await clickSearchButton(website, page);

    await page.locator(website.searchBarLocator).fill(product.name);
    await page.keyboard.press("Enter");

    if (website.filterCheck) await filterResults(page);

    return await filterMatches(product, website, page, settings);
  } catch (error) {
    console.error(`Error scraping ${website.name}:\n`, error);
  } finally {
    await browser.close();
  }
};

const potato = (i) => {
  console.log("starting function #", i);

  setTimeout(() => {
    console.log("Done!");
  }, "5000");

  return null;
};

const scrapeForPrices = async (product) => {
  const websites = await Website.findAll({ raw: true });
  const settings = await Setting.findOne({ raw: true });
  const filteredWebsites = websites.filter((website) => !website.excluded);

  const results = await Promise.all(
    filteredWebsites.map((website) => searchWebsite(product, website, settings))
  );

  const prices = results.flat().filter((val) => val !== undefined);
  console.log("🖥️   prices : ",  prices )
  return prices;
};

module.exports = {
  scrapeForPrices,
};

