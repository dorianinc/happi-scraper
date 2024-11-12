const { chromium } = require("playwright");

(async () => {
  try {
    console.log("Starting capture script...");
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://example.com"); // Replace with your target URL

    const capturedPositions = await page.evaluate(() => {
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

            // Resolve the promise with the position
            resolve(position);
          },
          { once: true }
        );
      });
    });

    return capturedPositions;
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await browser.close();
  }
})();
