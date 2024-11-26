const { chromium } = require("playwright");

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
    await page.evaluate(() => {
      // Create the "End" button
      const endButton = document.createElement("button");
      endButton.textContent = "Finish";
      endButton.style.position = "fixed";
      endButton.style.width = "120px"; // Adjusted width
      endButton.style.height = "60px"; // Adjusted height
      endButton.style.top = "50px";
      endButton.style.left = "10px";
      endButton.style.padding = "10px 20px";
      endButton.style.backgroundColor = "#FF0000";
      endButton.style.color = "white";
      endButton.style.fontSize = "16px";
      endButton.style.fontWeight = "bold";
      endButton.style.border = "2mm ridge #cc0000"; // Dark red ridge border
      endButton.style.borderRadius = "5px";
      endButton.style.cursor = "pointer";
      endButton.style.zIndex = "10000";
      endButton.id = "end-function-button";
      document.body.appendChild(endButton);
    });

    // Promise resolution logic
    result = await page.evaluate(() => {
      return new Promise((resolve) => {
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
          const position = {
            x1: rect.left + window.scrollX,
            y1: rect.top + window.scrollY,
            x2: rect.width,
            y2: rect.height,
          };

          // Resolve with both pageUrl and coordinates
          if (element.id === "end-function-button") {
            console.log("You clicked the End button!");
            resolve(list);
          } else {
            list.push({
              pageUrl: link ? link.href : null, // Always return link URL or null
              coordinates: position, // Always return position data
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
  return result;
};

module.exports = { getPositions };
