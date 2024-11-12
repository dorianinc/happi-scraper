const { calculateSimilarity } = require("./helpers");
const { chromium } = require("playwright");

const USER_AGENT_STRINGS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
];

const closePopUp = async (script, page) => {
  try {
    await page.waitForTimeout(1000);
    await page.locator(script.popUpLocator).click();
  } catch (error) {
    console.error("Error in closePopUp:\n", error);
  }
};

const clickSearchButton = async (script, page) => {
  try {
    await page.locator(script.searchButtonLocator).nth(0).click();
  } catch (error) {
    console.error("Error in clickSearchButton:\n", error);
  }
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

const filterMatches = async (product, script, page, settings) => {
  const { match } = require("../controller");
  await page.waitForTimeout(2000);

  const prices = [];
  let matchFound = false;

  const header = page.locator(script.headerLocator);
  const resultsLength = await header.count();
  const limit = Math.min(resultsLength, settings.filterLimit);

  for (let index = 0; index < limit; index++) {
    const scriptProductName = await header.nth(index).innerText();
    const similarityRating = calculateSimilarity(
      product.name,
      scriptProductName
    );
    
    if (similarityRating > settings.similarityThreshold) {
      matchFound = true;
      const price = await getPrice(script, page, index);
      prices.push(price);

      const newMatch = {
        name: scriptProductName,
        imgSrc: await getImage(script, page, index),
        url: await getUrl(script, page, index),
        price: price,
        scriptName: script.name,
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
  if (script.name === "Amazon") {
    const dollar = await page.locator(".a-price-whole").nth(index).innerText();
    const cent = await page.locator(".a-price-fraction").nth(index).innerText();
    price = parseFloat(`${dollar}${cent}`);
  } else if (script.name === "Big Bad Toy Store") {
    const dollar = await page.locator(".price-integer").nth(index).innerText();
    const cent = await page.locator(".price-decimal").nth(index).innerText();
    price = parseFloat(`${dollar}.${cent}`);
  } else {
    const priceText = await page
      .locator(script.priceLocator)
      .nth(index)
      .innerText();
    price = parseFloat(priceText.replace("$", ""));
  }
  return price;
};

const getImage = async (script, page, index) => {
  try {
    let imgSrc = await page
      .locator(script.imageLocator)
      .nth(index)
      .getAttribute("src");
    if (script.name === "Super Anime Store") {
      imgSrc = "https:" + imgSrc;
    }
    return imgSrc;
  } catch (error) {
    console.error("Error in getImage:\n", error);
  }
};

const getUrl = async (script, page, index) => {
  try {
    let url = await page
      .locator(script.urlLocator)
      .nth(index)
      .getAttribute("href");
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = script.url + url;
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

const runScript = async (product, script, settings) => {
  const browser = await chromium.launch({ headless: false });
  const page = await getPage(script.url, browser);

  for(let steps of script.items){
    console.log("🖥️  steps: ", steps)
    
  }

  try {
    if (script.popUpCheck) await closePopUp(script, page);
    if (script.searchButtonCheck) await clickSearchButton(script, page);

    await page.locator(script.searchBarLocator).fill(product.name);
    await page.keyboard.press("Enter");

    if (script.filterCheck) await filterResults(page);

    return await filterMatches(product, script, page, settings);
  } catch (error) {
    console.error(`Error scraping ${script.name}:\n`, error);
  } finally {
    await browser.close();
  }
};

const click = async (page, locator) => {
  await page.locator(locator).click();
}

const fill = async (page, locator, productName) => {
  await page.locator(locator).fill(productName);
  await page.keyboard.press("Enter");
}

const waitForTime = async (page, time) => {
  await page.waitForTimeout(time);
}

const waitForElement = async (page, locator) => {
  const response = {};
  try {
    console.log("Waiting for element...");
    await page.waitForTimeout(10000);
    const message = await page
      .locator(locator)
      .innerText();

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
}

const scrapeForPrices = async (product) => {
  const { script } = require("../controller");
  const { setting } = require("../controller");


  const scripts = await script.getScripts(true);
  const settings = await setting.getSettings();
  const filteredScripts = scripts.filter((script) => !script.excluded);
  console.log("🖥️🖥️🖥️🖥️  filteredScripts: ", filteredScripts)
  const results = await Promise.all(
    filteredScripts.map((script) => runScript(product, script, settings))
  );

  const prices = results.flat().filter((val) => val);
  console.log("🖥️  prices: ", prices)
  // return prices;
};

module.exports = {
  scrapeForPrices
}