const { calculateSimilarity, calculateAverage } = require("./helpers");
const { errors, chromium } = require("playwright");

const USER_AGENT_STRINGS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
];

const getMatches = async (product, script, page, settings) => {
  const res = {
    success: false,
    error: null,
    matches: [],
  };
  try {
    const { match } = require("../controller");
    await page.waitForTimeout(2000);

    const matches = [];
    const isTest = product.id ? false : true;
    const title = page.locator(script.productTitleLocator);

    const resultsLength = await title.count();
    if (resultsLength === 0) {
      const error = new Error("Title locator not found.");
      error.custom = true;
      throw error;
    }

    const limit = Math.min(resultsLength, settings.filterLimit);

    for (let index = 0; index < limit; index++) {
      const matchingProductName = await title.nth(index).innerText();

      const similarityRating = calculateSimilarity(
        product.name,
        matchingProductName
      );

      if (similarityRating >= settings.similarityThreshold) {
        // Construct the new match object
        const newMatch = {
          name: matchingProductName,
          imgSrc: await getImage(script, page, index),
          url: await getUrl(script, page, index),
          price: await getPrice(script, page, index),
          websiteName: script.siteName,
          similarityRating,
          excluded: false,
          productId: null,
        };
        matches.push(newMatch);

        if (!isTest) {
          newMatch.productId = product.id;
          await match.createMatch(newMatch);
        }
      }
    }
    return matches;
  } catch (error) {
    throw error;
  }
};

const getPrice = async (script, page, index) => {
  let price;
  if (!script.productPriceLocator) {
    const dollarLocator = page.locator(script.productDollarLocator).nth(index);
    const centLocator = page.locator(script.productCentLocator).nth(index);

    if (
      (await dollarLocator.count()) === 0 ||
      (await centLocator.count()) === 0
    ) {
      const error = new Error("Price locators not found");
      error.custom = true;
      throw error;
    }

    const dollar = await dollarLocator.innerText();
    const cent = await centLocator.innerText();
    price = parseFloat(`${dollar}${cent}`);
  } else {
    const priceLocator = page.locator(script.productPriceLocator).nth(index);

    if ((await priceLocator.count()) === 0) {
      const error = new Error("Price locators not found.");
      error.custom = true;
      throw error;
    }

    const priceText = await priceLocator.innerText();
    price = parseFloat(priceText.replace("$", ""));
  }
  return price;
};

const getImage = async (script, page, index) => {
  const imageLocator = page.locator(script.productImageLocator).nth(index);
  if ((await imageLocator.count()) === 0) {
    const error = new Error("Image locator not found.");
    error.custom = true;
    throw error;
  }

  let imgSrc = await imageLocator.getAttribute("src");

  let fullURL = new URL(imgSrc, script.siteUrl);
  return fullURL.href;
};

const getUrl = async (script, page, index) => {
  const urlLocator = page.locator(script.productUrlLocator).nth(index);

  if ((await urlLocator.count()) === 0) {
    const error = new Error("URL locator not found.");
    error.custom = true;
    throw error;
  }

  let url = await urlLocator.getAttribute("href");
  let fullURL = new URL(url, script.siteUrl);
  return fullURL.href;
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

const clickOnElement = async (page, actions) => {
  const sortedActions = [...actions].sort((a, b) => a.step - b.step);
  for (let i = 0; i < sortedActions.length; i++) {
    const action = sortedActions[i];
    try {
      await page.waitForTimeout(1500);
      await page.locator(action.locator).click();
    } catch (error) {
      const newError = handleError(error, action);
      throw newError;
    }
  }
};

const clickOnCoordinates = async (page, actions) => {
  const sortedActions = [...actions].sort((a, b) => a.step - b.step);
  for (let i = 0; i < sortedActions.length; i++) {
    const coordinates = sortedActions[i];
    await page.waitForTimeout(1500);
    await page.mouse.click(
      coordinates.x1 + coordinates.x2 / 2,
      coordinates.y1 + coordinates.y2 / 2
    );
  }
};

const fillInput = async (page, action, productName) => {
  try {
    if (!productName) {
      const error = new Error("Could not find product name to query.");
      error.custom = true;
      throw error;
    }

    await page.locator(action.locator).fill(productName);
    await page.keyboard.press("Enter");
  } catch (error) {
    const newError = handleError(error);
    throw newError;
  }
};

const delayScript = async (page, action) => {
  await page.waitForTimeout(action.seconds);
};

const runScript = async (product, singleScript, settings) => {
  const { script } = require("../controller");
  const { scriptItem } = require("../controller");

  const browser = await chromium.launch({ headless: false });
  const page = await getPage(singleScript.siteUrl, browser);

  for (let item of singleScript.items) {
    try {
      switch (item.type) {
        case "fill":
          await fillInput(page, item.actions[0], product.name);
          break;
        case "delay":
          await delayScript(page, item.actions[0]);
          break;
        case "clickOnElement":
          await clickOnElement(page, item.actions);
          break;
        case "coordinateClick":
          await clickOnCoordinates(page, item.actions);
          break;
        default:
          throw new Error("Unknown type");
      }
      scriptItem.setErrorMessage(item.id);
    } catch (error) {
      console.error(`Error scraping, ${singleScript.siteName}:\n`, error);
      scriptItem.setErrorMessage(item.id, error);
      await browser.close();
      return;
    }
  }

  try {
    const matches = await getMatches(product, singleScript, page, settings);
    script.setErrorMessage(singleScript.id);
    return matches;
  } catch (error) {
    console.error(`Error scraping, ${singleScript.siteName}:\n`, error.message);
    script.setErrorMessage(singleScript.id, error);
  } finally {
    await browser.close();
  }
};

const scrapeAllWebsites = async (product) => {
  const { script } = require("../controller");
  const { setting } = require("../controller");

  const { allScripts } = await script.getScripts();
  const settings = await setting.getSettings();
  const filteredScripts = allScripts.filter((script) => !script.isExcluded);

  const singleScripts = await Promise.all(
    filteredScripts.map((s) => script.getSingleScript(s.id))
  );

  const results = await Promise.all(
    singleScripts.map((singleScript) =>
      runScript(product, singleScript, settings)
    )
  );

  const prices = results.flat().filter((val) => val);
  return prices;
};

const scrapeSingleWebsite = async ({ scriptId, product }) => {
  const { script } = require("../controller");
  const { setting } = require("../controller");

  const singleScript = await script.getSingleScript(scriptId);
  const settings = await setting.getSettings();

  let numResults = 0;
  let avgPrice = 0;
  const matches = await runScript(product, singleScript, settings);
  if (matches) {
    numResults = matches.length;
    avgPrice = calculateAverage(matches);
  }
  return { numResults, avgPrice };
};

const handleError = (error, action = null) => {
  if (error.custom) {
    return error.message;
  }
  if (error instanceof errors.TimeoutError) {
    if (action?.locator) {
      return `The operation took too long. We couldn't find element: ${action.locator}`;
    } else {
      return "The operation took too long. We couldn't find the element.";
    }
  } else if (error instanceof errors.ElementHandleError) {
    return "There was an issue interacting with the element. It might not be available.";
  } else if (error instanceof errors.PageError) {
    return "Something went wrong while interacting with the page.";
  } else if (error instanceof errors.NetworkError) {
    return "There was a problem loading the page. Please check your internet connection.";
  } else if (error instanceof errors.BrowserContextClosedError) {
    return "The browser session was closed unexpectedly.";
  } else if (error instanceof errors.PageClosedError) {
    return "The page you were interacting with was closed.";
  } else if (error instanceof errors.BrowserClosedError) {
    return "The browser was closed. Please restart your session.";
  } else if (error instanceof errors.NotConnectedError) {
    return "Connection to the browser was lost. Please try again.";
  } else {
    return "An unexpected error occurred. Please try again.";
  }
};

module.exports = {
  scrapeAllWebsites,
  scrapeSingleWebsite,
};

// const waitForElement = async (page, locator) => {
//   const response = {};
//   try {
//     await page.waitForTimeout(10000);
//     const message = await page.locator(locator).innerText();

//     if (message) {
//       response.success = true;
//       response.message = message;
//     } else {
//       response.success = false;
//       response.message = null;
//     }
//   } catch (error) {
//     console.error("Failed while waiting for element: ", error.message);
//     response.success = false;
//     response.message = null;
//   }
//   return response;
// };
