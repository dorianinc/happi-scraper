const { chromium } = require("playwright");

const USER_AGENT_STRINGS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
];

async function closePopUp(website, page) {
  try {
    await page.waitForTimeout(1000);
    await page.locator(website.popUpLocator).click();
  } catch (error) {
    console.error("Error in closePopUp:\n", error);
  }
}

async function clickSearchButton(website, page) {
  try {
    await page.locator(website.searchButtonLocator).nth(0).click();
  } catch (error) {
    console.error("Error in clickSearchButton:\n", error);
  }
}

function calculateAverage(prices) {
  const total = prices.reduce((acc, curr) => acc + curr, 0);
  const average = total / prices.length;
  return average.toFixed(2);
}

async function filterResults(page) {
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
}

async function filterMatches(product, website, page, settings) {
  const prices = [];
  let matchFound = false;
  try {
    const header = await page.locator(website.headerLocator);
    const isVisible = await header.nth(0).isVisible();
    console.log("🖥️  isVisible: ", isVisible);
    if (isVisible) {
      const resultsLength = await header.count();
      const limit = Math.min(resultsLength, settings.filterLimit);

      for (let index = 0; index < limit; index++) {
        const websiteProductName = await header.nth(index).innerText();
        ////////////// Import match products helper
        const similarityRating = matchProducts(
          product.name,
          websiteProductName
        );
        if (similarityRating > settings.similarityThreshold) {
          matchFound = true;
          const price = await getPrice(website, page, index);
          prices.push(price);

          // DO ALL DATABASE MATCH LOGIC HERE
          const match = {
            name: websiteProductName,
            img_src: await getImage(website, page, index),
            url: await getUrl(website, page, index),
            price: price,
            website_name: website.name,
            similarity_rating: similarityRating,
            website_id: website.id,
            product_id: product.id,
          };
          // Assuming db is some global database object
          // db.session.add(match);
          // db.session.commit();
        }
      }
      if (matchFound) {
        return prices;
      }
    }
  } catch (error) {
    console.error(`No results found for ${product.name} in ${website.name}`);
  }
}

async function getPrice(website, page, index) {
  let price;
  if (website.name === "Amazon") {
    const dollar = await page.locator(".a-price-whole").nth(index).innerText();
    // dollar_text = dollar_text.strip()
    // dollar_text = dollar_text.replace('\n', '')
    const cent = await page.locator(".a-price-fraction").nth(index).innerText();
    // cent_text = cent_text.strip()
    price = parseFloat(`${dollar}${cent}`);
  } else if (website.name === "Big Bad Toy Store") {
    const dollar = await page.locator(".price-integer").nth(index).innerText();
    // dollar_text = dollar_text.strip()
    const cent = await page.locator(".price-decimal").nth(index).innerText();
    // cent_text = cent_text.strip()
    price = parseFloat(`${dollar}.${cent}`);
  } else {
    const priceText = await page
      .locator(website.priceLocator)
      .nth(index)
      .innerText();
    price = parseFloat(priceText.replace("$", ""));
  }
  return price;
}

async function getImage(website, page, index) {
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
}

async function getUrl(website, page, index) {
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
}

async function getPage(url, browser) {
  const userAgents =
    USER_AGENT_STRINGS[Math.floor(Math.random() * USER_AGENT_STRINGS.length)];
  const context = await browser.newContext({
    userAgent: userAgents,
  });
  await context.addInitScript(
    "Object.defineProperty(navigator, 'webdriver', {get: () => undefined})"
  );
  const page = await context.newPage();
  await page.goto(url);
  return page;
}

async function scrapeWebsite(product, website, settings) {
  const browser = await chromium.launch({ headless: true, slowMo: 500 });
  const page = await getPage(website.url, browser);

  try {
    if (website.popUpCheck) {
      await closePopUp(website, page);
    }
    if (website.searchButtonCheck) {
      await clickSearchButton(website, page);
    }

    await page.locator(website.searchBarLocator).fill(product.name);
    await page.keyboard.press("Enter");

    if (website.filterCheck) {
      await filterResults(page);
    }

    return await filterMatches(product, website, page, settings);
  } catch (error) {
    console.error(`Error scraping ${website.name}:\n`, error);
  } finally {
    await browser.close();
  }
}

async function createMatch(product, websites, settings) {
  const includedSites = websites
    .filter((website) => !website.excluded)
    .map((website) => scrapeWebsite(product, website, settings));

  const results = await Promise.all(includedSites);
  const allPrices = results.flat().filter((val) => val !== null);
  if (allPrices.length) {
    const avgPrice = calculateAverage(allPrices);
    return avgPrice;
  } else {
    return null;
  }
}