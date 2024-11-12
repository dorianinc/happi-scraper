const { calculateSimilarity } = require("./helpers");
const { chromium } = require("playwright");

const USER_AGENT_STRINGS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
];

const findMatches = async (product, script, page, settings) => {
  const { match } = require("../controller");
  await page.waitForTimeout(2000);

  const prices = [];
  let matchFound = false;

  const title = page.locator(script.titleLocation);
  const resultsLength = await title.count();
  const limit = Math.min(resultsLength, settings.filterLimit);

  for (let index = 0; index < limit; index++) {
    const scriptProductName = await title.nth(index).innerText();
    const similarityRating = calculateSimilarity(
      product.name,
      scriptProductName
    );

    if (similarityRating >= settings.similarityThreshold) {
      matchFound = true;
      const price = await getPrice(script, page, index);
      prices.push(price);

      const newMatch = {
        name: scriptProductName,
        imgSrc: await getImage(script, page, index),
        url: await getUrl(script, page, index),
        price: price,
        websiteName: script.siteName,
        similarityRating: similarityRating,
        excluded: false,
        productId: product.id,
      };
      await match.createMatch(newMatch);
    }
  }
  if (matchFound) {
    return prices;
  } else {
    return prices;
  }
};

const getPrice = async (script, page, index) => {
  let price;
  if (!script.priceLocation) {
    const dollar = await page
      .locator(script.dollarLocation)
      .nth(index)
      .innerText();
    const cent = await page.locator(script.centLocation).nth(index).innerText();
    price = parseFloat(`${dollar}${cent}`);
  } else {
    const priceText = await page
      .locator(script.priceLocation)
      .nth(index)
      .innerText();
    price = parseFloat(priceText.replace("$", ""));
  }
  return price;
};

const getImage = async (script, page, index) => {
  try {
    let imgSrc = await page
      .locator(script.imageLocation)
      .nth(index)
      .getAttribute("src");

    let fullURL = new URL(imgSrc, script.url);
    return fullURL.href;
  } catch (error) {
    console.error("Error in getImage:\n", error);
  }
};

const getUrl = async (script, page, index) => {
  try {
    let url = await page
      .locator(script.urlLocation)
      .nth(index)
      .getAttribute("href");

    let fullURL = new URL(url, script.url);
    return fullURL.href;
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

const runScript = async (product, script, settings) => {
  const browser = await chromium.launch({ headless: false });
  const page = await getPage(script.url, browser);
  try {
    for (let item of script.items) {
      switch (item.type) {
        case "fill":
          // Handle the 'fill' type
          console.log("Filling in the input");
          await fill(page, item.value, product.name);
          break;

        case "waitForElement":
          // Handle the 'waitForElement' type
          console.log("Waiting for an element");
          // Add your 'waitForElement' logic here
          break;

        case "waitForTimeout":
          // Handle the 'waitForTimeout' type
          console.log("Waiting for a timeout");
          // Add your 'waitForTimeout' logic here
          break;

        case "click":
          // Handle the 'click' type
          console.log("Clicking on the element");
          // Add your 'click' logic here
          break;

        default:
          console.log("Unknown type");
        // Handle unknown type here
      }
    }
    return await findMatches(product, script, page, settings);
    // return await findMatches(product, script, page, settings);
  } catch (error) {
    console.error(`Error scraping ${script.siteName}:\n`, error);
  } finally {
    await browser.close();
  }
};

const click = async (page, locator) => {
  await page.locator(locator).click();
};

const fill = async (page, locator, productName) => {
  await page.locator(locator).fill(productName);
  await page.keyboard.press("Enter");
};

const waitForTime = async (page, time) => {
  await page.waitForTimeout(time);
};

const waitForElement = async (page, locator) => {
  const response = {};
  try {
    console.log("Waiting for element...");
    await page.waitForTimeout(10000);
    const message = await page.locator(locator).innerText();

    if (message) {
      response.success = true;
      response.message = message;
    } else {
      response.success = false;
      response.message = null;
    }
  } catch (error) {
    console.error("Failed while waiting for element: ", error.message);
    response.success = false;
    response.message = null;
  }
  return response;
};

const scrapeForPrices = async (product) => {
  const { script } = require("../controller");
  const { setting } = require("../controller");

  const scripts = await script.getScripts(true);
  const settings = await setting.getSettings();
  const filteredScripts = scripts.filter((script) => !script.isExcluded);
  console.log("🖥️🖥️🖥️🖥️  filteredScripts: ", filteredScripts);
  const results = await Promise.all(
    filteredScripts.map((script) => runScript(product, script, settings))
  );

  const prices = results.flat().filter((val) => val);
  console.log("🖥️  prices: ", prices);
  // return prices;
};

module.exports = {
  scrapeForPrices,
};
