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

  const title = page.locator(script.productTitleLocator);
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
  if (!script.productPriceLocator) {
    const dollar = await page
      .locator(script.productDollarLocator)
      .nth(index)
      .innerText();
    const cent = await page
      .locator(script.productCentLocator)
      .nth(index)
      .innerText();
    price = parseFloat(`${dollar}${cent}`);
  } else {
    const priceText = await page
      .locator(script.productPriceLocator)
      .nth(index)
      .innerText();
    price = parseFloat(priceText.replace("$", ""));
  }
  return price;
};

const getImage = async (script, page, index) => {
  try {
    let imgSrc = await page
      .locator(script.productImageLocator)
      .nth(index)
      .getAttribute("src");

    let fullURL = new URL(imgSrc, script.siteUrl);
    return fullURL.href;
  } catch (error) {
    console.error("Error in getImage:\n", error);
  }
};

const getUrl = async (script, page, index) => {
  try {
    let url = await page
      .locator(script.productUrlLocator)
      .nth(index)
      .getAttribute("href");

    let fullURL = new URL(url, script.siteUrl);
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

const runScript = async (product, scriptId, settings) => {
  const { script } = require("../controller");
  const singleScript = await script.getSingleScript(scriptId);
  const browser = await chromium.launch({ headless: false });
  const page = await getPage(singleScript.siteUrl, browser);
  try {
    for (let item of singleScript.items) {
      let action;
      switch (item.type) {
        case "fill":
          // Handle the 'fill' type
          action = item.actions[0];
          await fillInput(page, action, product.name);
          break;

        case "delay":
          // Handle the 'waitForElement' type
          action = item.actions[0];
          await delayScript(page, action);
          break;

        case "waitForTimeout":
          // Handle the 'waitForTimeout' type
          console.log("Waiting for a timeout");
          // Add your 'waitForTimeout' logic here
          break;

        case "clickOnElement":
          // Handle the 'click' type
          console.log("Clicking on the element");
          // Add your 'click' logic here
          break;

        case "coordinateClick":
          // Handle the 'click' type
          await clickOnCoordinates(page, item.actions);
          break;

        default:
          console.error("Unknown type");
        // Handle unknown type here
      }
    }
    return await findMatches(product, singleScript, page, settings);
  } catch (error) {
    console.error(`Error scraping ${singleScript.siteName}:\n`, error);
  } finally {
    await browser.close();
  }
};

const clickOnElement = async (page, locator) => {
  await page.locator(locator).click();
};

const clickOnCoordinates = async (page, actions) => {
  const sortedActions = [...actions].sort((a, b) => a.step - b.step);
  for (let i = 0; i < sortedActions.length; i++) {
    const coordinates = sortedActions[i];
    await page.waitForTimeout(3000);
    await page.mouse.click(
      coordinates.x1 + coordinates.x2 / 2,
      coordinates.y1 + coordinates.y2 / 2
    );
  }
  await page.waitForTimeout(5000);
};

const fillInput = async (page, action, productName) => {
  await page.locator(action.locator).fill(productName);
  await page.keyboard.press("Enter");
};

const delayScript = async (page, action) => {
  await page.waitForTimeout(action.seconds);
};

const waitForElement = async (page, locator) => {
  const response = {};
  try {
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

  const { allScripts } = await script.getScripts(true);
  const settings = await setting.getSettings();
  const filteredScripts = allScripts.filter((script) => !script.isExcluded);
  const results = await Promise.all(
    filteredScripts.map((script) => runScript(product, script.id, settings))
  );

  const prices = results.flat().filter((val) => val);
  return prices;
};

module.exports = {
  scrapeForPrices,
};
