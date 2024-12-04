const { chromium } = require("playwright");
const { createFinishButton } = require("./helpers");

const getPositions = async (siteUrl) => {
  let browser;
  let page;
  let result = null;

  try {
    console.log("Starting capture script...");
    browser = await chromium.launch({ headless: false }); // Initialize the browser
    page = await browser.newPage(); // Create a new page
    await page.goto(siteUrl); // Navigate to the target URL

    // Inject a button for closing the browser
    createFinishButton(page);

    // Promise resolution logic
    result = await page.evaluate(() => {
      return new Promise((resolve) => {
        let step = 1;
        const list = [];

        document.addEventListener("click", (event) => {
          const element = event.target;

          // Prevent default behavior and stop event propagation
          event.preventDefault();
          event.stopPropagation();

          // Find the nearest link (if any)
          const link = element.closest("a");

          // Get element position
          const rect = element.getBoundingClientRect();
          const x1 = rect.left + window.scrollX;
          const y1 = rect.top + window.scrollY;
          const x2 = rect.width;
          const y2 = rect.height;
          // Resolve with both pageUrl and coordinates
          if (element.id === "end-function-button") {
            resolve(list);
          } else {
            list.push({
              pageUrl: link ? link.href : null, // Always return link URL or null
              x1, y1, x2, y2,
              step: step++,
            });
          }
        });
      });
    });
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    // Close the browser if it was successfully launched
    if (browser) {
      await browser.close();
    }
  }

  // Return the result object containing pageUrl and coordinates
  console.log("🖥️  result: ", result);
  return result;
};

module.exports = { getPositions };
