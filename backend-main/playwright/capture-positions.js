const { chromium } = require("playwright");

const getPositions = async (siteUrl) => {
  let browser;
  let page;
  let coordinates = null;

  try {
    console.log("Starting capture script...");
    browser = await chromium.launch({ headless: false }); // Initialize the browser
    page = await browser.newPage(); // Create a new page
    await page.goto(siteUrl); // Replace with your target URL
    coordinates = await page.evaluate(() => {
      return new Promise((resolve) => {
        document.addEventListener(
          "click",
          (event) => {
            const element = event.target;

            // Prevent default behavior and stop event propagation
            event.preventDefault();
            event.stopPropagation();

            // Get element position
            const rect = element.getBoundingClientRect();
            const position = {
              y1: rect.top + window.scrollY,
              x1: rect.left + window.scrollX,
              x2: rect.width,
              y2: rect.height,
            };

            // Resolve the promise with the captured position
            resolve(position);
          },
          { once: true } // Only capture the first click
        );
      });
    });
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    // Close the browser if it was successfully launched
    // if (browser) {
    //   await browser.close();
    // }
  }

  // Return the captured position after closing the browser
  return { page, coordinates };
};

module.exports = { getPositions };

// so it looks like you would just have to build it up until page.
// once you have access to page you can make a while loop that contains a menu of sorts;
// add a switch case.

// while !exit >> wait for prompt; you would then click on different step you have on your list.
// probably clicking find to trigger that you are now searching for an element, coordinates or something
// then you would click a close button to close out the page/browser
