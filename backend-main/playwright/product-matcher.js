const { calculateSimilarity } = require("./helpers");
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
      throw new errors.TimeoutError(
        "No titles found using the provided locator."
      );
    }

    console.log("🖥️  resultsLength: ", resultsLength);
    const limit = Math.min(resultsLength, settings.filterLimit);

    for (let index = 0; index < limit; index++) {
      const MatchingProductName = await title.nth(index).innerText();
      console.log("🖥️  MatchingProductName: ", MatchingProductName);

      const similarityRating = calculateSimilarity(
        product.name,
        MatchingProductName
      );

      if (similarityRating >= settings.similarityThreshold) {
        const imgSrcResult = await getImage(script, page, index);
        console.log("🖥️  imgSrcResult: ", imgSrcResult)
        if (!imgSrcResult.success) {
          const message = handleError(imgSrcResult.error);
          res.message = message;
          scriptItem.addErrorMessage(item.id, res);
          return; // Skip this iteration if image fails
        }
        const imgSrc = imgSrcResult.imgSrc;
        
        const urlResult = await getUrl(script, page, index);
        if (!urlResult.success) {
          const message = handleError(urlResult.error);
          res.message = message;
          scriptItem.addErrorMessage(item.id, res);
          return; // Skip this iteration if URL fails
        }
        const url = urlResult.url;
        
        const priceResult = await getPrice(script, page, index);
        if (!priceResult.success) {
          const message = handleError(priceResult.error);
          res.message = message;
          scriptItem.addErrorMessage(item.id, res);
          return; // Skip this iteration if price fails
        }
        const price = priceResult.price;
        
        // Construct the new match object
        const newMatch = {
          name: MatchingProductName,
          imgSrc,
          url,
          price,
          websiteName: script.siteName,
          similarityRating: similarityRating,
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
    res.success = true;
    res.matches = matches;
  } catch (error) {
    res.error = error;
  } finally {
    return res;
  }
};

const getPrice = async (script, page, index) => {
  const res = {
    success: false,
    error: null,
    price: null,
  };

  try {
    let price;
    if (!script.productPriceLocator) {
      const dollarLocator = page
        .locator(script.productDollarLocator)
        .nth(index);
      const centLocator = page.locator(script.productCentLocator).nth(index);

      if (
        (await dollarLocator.count()) === 0 ||
        (await centLocator.count()) === 0
      ) {
        throw new errors.TimeoutError("Price locators not found.");
      }

      const dollar = await dollarLocator.innerText();
      const cent = await centLocator.innerText();
      price = parseFloat(`${dollar}${cent}`);
    } else {
      const priceLocator = page.locator(script.productPriceLocator).nth(index);

      if ((await priceLocator.count()) === 0) {
        throw new errors.TimeoutError("Price locator not found.");
      }

      const priceText = await priceLocator.innerText();
      price = parseFloat(priceText.replace("$", ""));
    }
    res.success = true;
    res.price = price;
  } catch (error) {
    res.error = error;
  } finally {
    return res;
  }
};

const getImage = async (script, page, index) => {
  console.log("-----------> getting image <----------");
  const res = {
    success: false,
    error: null,
    imgSrc: null,
  };
  try {
    const imageLocator = page.locator(script.productImageLocator).nth(index);
    console.log("🖥️  imageLocator: ", imageLocator);
    console.log("are there images? ", (await imageLocator.count()) === 0);

    if ((await imageLocator.count()) === 0) {
      console.log("THROWING ERROR!!!!!!!!");
      throw new errors.TimeoutError("Image locator not found.");
    }

    let imgSrc = await imageLocator.getAttribute("src");
    console.log("🖥️🖥️🖥️🖥️🖥️ imgSrc: ", imgSrc);

    let fullURL = new URL(imgSrc, script.siteUrl);
    res.success = true;
    res.imgSrc = fullURL.href;
  } catch (error) {
    console.log("!!!!!!!! THERE IS AN ERROR!!!!!!!");
  } finally {
    return res;
  }
};

const getUrl = async (script, page, index) => {
  const res = {
    success: false,
    error: null,
    url: null,
  };
  try {
    const urlLocator = page.locator(script.productUrlLocator).nth(index);

    if ((await urlLocator.count()) === 0) {
      throw new errors.TimeoutError("URL locator not found.");
    }

    let url = await urlLocator.getAttribute("href");
    let fullURL = new URL(url, script.siteUrl);
    res.success = true;
    res.url = fullURL.href;
  } catch (error) {
    res.error = error;
  } finally {
    return res;
  }
};

const getPage = async (url, browser) => {
  const res = {
    success: false,
    error: null,
    page: null,
  };
  try {
    const userAgents =
      USER_AGENT_STRINGS[Math.floor(Math.random() * USER_AGENT_STRINGS.length)];
    const context = await browser.newContext({ userAgent: userAgents });
    await context.addInitScript(
      "Object.defineProperty(navigator, 'webdriver', {get: () => undefined})"
    );
    const page = await context.newPage();
    await page.goto(url);
    res.success = true;
    res.page = page;
  } catch (error) {
    res.error = error;
  } finally {
    return res;
  }
};

const clickOnElement = async (page, actions) => {
  const res = {
    success: false,
    error: null,
  };

  try {
    const sortedActions = [...actions].sort((a, b) => a.step - b.step);
    for (let i = 0; i < sortedActions.length; i++) {
      console.log("❗❗ CLICKING ON ELEMENT ❗❗");
      const locator = sortedActions[i];
      await page.waitForTimeout(1500);
      await page.locator(locator).click();
    }
    await page.waitForTimeout(1500);
    res.success = true;
  } catch (error) {
    res.error = error;
  } finally {
    return res;
  }
};

const clickOnCoordinates = async (page, actions) => {
  const res = {
    success: false,
    error: null,
  };
  try {
    const sortedActions = [...actions].sort((a, b) => a.step - b.step);
    for (let i = 0; i < sortedActions.length; i++) {
      const coordinates = sortedActions[i];
      await page.waitForTimeout(1500);
      await page.mouse.click(
        coordinates.x1 + coordinates.x2 / 2,
        coordinates.y1 + coordinates.y2 / 2
      );
    }
    res.success = true;
  } catch (error) {
    res.error = error;
  } finally {
    return res;
  }
};

const fillInput = async (page, action, productName) => {
  const res = {
    success: false,
    error: null,
  };

  try {
    await page.locator(action.locator).fill(productName);
    await page.keyboard.press("Enter");
    res.success = true;
  } catch (error) {
    res.error = error;
  } finally {
    return res;
  }
};

const delayScript = async (page, action) => {
  const res = {
    success: false,
    error: null,
  };

  try {
    await page.waitForTimeout(action.seconds);
    res.success = true;
  } catch (error) {
    res.error = error;
  } finally {
    return res;
  }
};

const runScript = async (product, singleScript, settings) => {
  const { scriptItem } = require("../controller");

  const res = {
    success: false,
    payload: null,
    error: null,
  };
  const browser = await chromium.launch({ headless: false });
  const pageRes = await getPage(singleScript.siteUrl, browser);
  if (!pageRes.success) {
    res.error = pageRes.error;
    await browser.close();
    return res;
  }
  const page = pageRes.page;

  try {
    for (let item of singleScript.items) {
      let action;
      switch (item.type) {
        case "fill":
          action = await fillInput(page, item.actions[0], product.name);
          break;
        case "delay":
          action = await delayScript(page, item.actions[0]);
          break;
        case "clickOnElement":
          action = await clickOnElement(page, item.actions);
          break;
        case "coordinateClick":
          action = await clickOnCoordinates(page, item.actions);
          break;
        default:
          res.error = new Error("Unknown type");
          return res;
      }
      if (!action.success) {
        const message = handleError(action.error);
        res.message = message;
        scriptItem.addErrorMessage(item.id, res);
        return res;
      }
    }
    const matchesRes = await getMatches(product, singleScript, page, settings);
    console.log("🖥️  matchesRes: ", matchesRes);
    if (!matchesRes.success) {
      console.log("-------> res was not successful <------- ");
      const message = handleError(matchesRes.error);
      res.message = message;
      scriptItem.addErrorMessage(item.id, res);
      return res;
    }
    res.success = true;
    res.payload = matchesRes.matches;
  } catch (error) {
    console.error(`Error scraping ${singleScript.siteName}:\n`, error);
    // res.error = error;
  } finally {
    await browser.close();
    console.log("res in runScript: ", res);
    return res;
  }
};

//   if (action.error) {
//     const message = handleError(action.error);
//     res.message = message;
//     scriptItem.addErrorMessage(item.id, res);
//     return res;
//   }
// }

const scrapeAllWebsites = async (product) => {
  const { script } = require("../controller");
  const { setting } = require("../controller");

  const { allScripts } = await script.getScripts(true);
  const settings = await setting.getSettings();
  const filteredScripts = allScripts.filter((script) => !script.isExcluded);

  const singleScripts = await Promise.all(
    filteredScripts.map((script) => script.getSingleScript(script.id))
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

  const results = await runScript(product, singleScript, settings);
  return results;
};

const handleError = (error, action) => {
  if (error instanceof errors.TimeoutError) {
    return "The operation took too long. We couldn't find the element in time.";
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
