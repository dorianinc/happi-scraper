const { chromium } = require("playwright");

const getPositions = async () => {
  let browser;
  let capturedPositions = null;

  try {
    console.log("Starting capture script...");
    browser = await chromium.launch({ headless: false }); // Initialize the browser
    const page = await browser.newPage(); // Create a new page
    await page.goto("https://example.com"); // Replace with your target URL
    capturedPositions = await page.evaluate(() => {
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
              top: rect.top + window.scrollY,
              left: rect.left + window.scrollX,
              width: rect.width,
              height: rect.height,
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
    if (browser) {
      await browser.close();
    }
  }

  // Return the captured position after closing the browser
  return capturedPositions;
};

module.exports = { getPositions };
