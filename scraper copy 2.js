const { calculateSimilarity } = require("./helpers");
const { chromium } = require("playwright");

const USER_AGENT_STRINGS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
];

const click = async (website, page, delay, index) => {
  try {
    let element;

    if (index) {
      element = page.locator(website.popUpLocator).nth(index);
    } else {
      element = page.locator(website.popUpLocator);
    }

    if (delay) {
      await page.waitForTimeout(delay);
    }

    const isVisible = await element.isVisible();
    if (isVisible) {
      await element.click();
    } else {
      throw new Error("Element not found or not visible.");
    }
  } catch (error) {
    console.error(`Error:`, error);
    await browser.close();
    throw new Error("Unable to click on element");
  }
};

const search = async (product, website, settings) => {
  try {
    const searchBar = page.locator(website.searchBarLocator);
    const isVisible = await searchBar.isVisible();

    if (isVisible) {
      await searchBar.fill(product.name);
    } else {
      throw new Error("Search bar not found or not visible.");
    }
    await page.keyboard.press("Enter");
    await browser.close();
  } catch (error) {
    console.error(`Error`, error);
    throw new Error("Unable to search for query");
  }
};

const getImage = async (website, page, delay, index) => {
  try {
    let element;

    if (index) {
      element = page.locator(website.imageLocator).nth(index);
    } else {
      element = page.locator(website.imageLocator);
    }

    if (delay) {
      await page.waitForTimeout(delay);
    }

    const isVisible = await element.isVisible();
    if (isVisible) {
      const baseUrl = website.url;
      const imageUrl = await element.getAttribute("src");
      const fullUrl = new URL(imageUrl, baseUrl);

      return fullUrl.href;
    } else {
      throw new Error("Image not found or not visible.");
    }
  } catch (error) {
    console.error(`Error:`, error);
    await browser.close();
    throw new Error("Unable to get image");
  }
};

const getUrl = async (website, page, delay, index) => {
  try {
    let element;

    if (index) {
      element = page.locator(website.urlLocator).nth(index);
    } else {
      element = page.locator(website.urlLocator);
    }

    if (delay) {
      await page.waitForTimeout(delay);
    }

    const isVisible = await element.isVisible();
    if (isVisible) {
      const baseUrl = website.url;
      const url = await element.getAttribute("href");
      const fullUrl = new URL(url, baseUrl);

      return fullUrl.href;
    } else {
      throw new Error("Url not found or not visible.");
    }
  } catch (error) {
    console.error(`Error:`, error);
    await browser.close();
    throw new Error("Unable to get url");
  }
};

const getPrice = async (website, page, index) => {
  try {
    let element;
    let priceLocation = website.priceLocation;
    let dollarLocation = website.dollarLocation;
    let centLocation = website.centLocation;

    if (priceLocation) {
      if (index) {
        priceLocation = page.locator(priceLocation).nth(index);
      } else {
        priceLocation = page.locator(priceLocation);
      }

      if (delay) {
        await page.waitForTimeout(delay);
      }

      const isVisible = await priceLocation.isVisible();
      if (isVisible) {
        let priceText = await priceLocation.innerText();
        // Handle different formats of price
        let price = parseFloat(
          priceText.replace(/[^0-9.,]/g, "").replace(",", ".")
        );
        return price;
      } else {
        throw new Error("Price not found or not visible.");
      }
    } else {
      if (index) {
        dollarLocation = page.locator(dollarLocation).nth(index);
        centLocation = page.locator(centLocation).nth(index);
      } else {
        dollarLocation = page.locator(dollarLocation);
        centLocation = page.locator(centLocation);
      }

      if (delay) {
        await page.waitForTimeout(delay);
      }

      const dollarIsVisible = await dollarLocation.isVisible();
      const centIsVisible = await centLocation.isVisible();
      if (dollarIsVisible && centIsVisible) {
        let dollarText = await dollarLocation.innerText();
        let centText = await centLocation.innerText();

        // Remove any non-numeric characters, handle missing cents
        let dollar = parseFloat(dollarText.replace(/[^0-9]/g, ""));
        let cent = parseFloat(centText.replace(/[^0-9]/g, "")) || 0;

        // Combine dollar and cents into a single price
        let price = parseFloat(`${dollar}.${cent}`);
        return price;
      } else {
        throw new Error("Dollar or cents element not found or not visible.");
      }
    }
  } catch (error) {
    console.error("Error:", error);
    await browser.close();
    throw new Error("Unable to get price");
  }
};

//////////////////////////////////////////////////////////////////////////

const filter = async (product, website, page, settings) => {
  await page.waitForTimeout(2000);

  const prices = [];
  let matchFound = false;

  const header = page.locator(website.headerLocator);
  const resultsLength = await header.count();
  const limit = Math.min(resultsLength, settings.filterLimit);

  for (let index = 0; index < limit; index++) {
    const websiteProductName = await header.nth(index).innerText();
    const similarityRating = calculateSimilarity(
      product.name,
      websiteProductName
    );

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
      await createMatch(newMatch);
    }
  }
  if (matchFound) {
    return prices;
  } else {
    return prices;
  }
};

const createPage = async (url) => {
  const browser = await chromium.launch({ headless: false });
  const userAgents =
    USER_AGENT_STRINGS[Math.floor(Math.random() * USER_AGENT_STRINGS.length)];
  const context = await browser.newContext({
    userAgent: userAgents,
    viewport: { width: 1200, height: 1000 },
  });
  await context.addInitScript(
    "Object.defineProperty(navigator, 'webdriver', {get: () => undefined})"
  );
  const page = await context.newPage();
  await page.goto(url);
  return page;
};


const getMatches = (product, website, settings) => {

  const page = createPage(website.url)

}


const potato = async (product) => {
  const { website } = require("../controller");
  const { setting } = require("../controller");


  const settings = await getSettings();
  const websites = await getWebsites();
  const filteredWebsites = websites.filter((website) => !website.excluded);
  const results = await Promise.all(
    filteredWebsites.map((website) => getMatches(product, website, settings))
  );

};

module.exports = {
  scrapeForPrices,
};
