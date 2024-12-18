const { chromium } = require("playwright");

const USER_AGENT_STRINGS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
];

const getFillLocator = async (siteUrl, query) => {
  let userAgents;
  let browser;
  let context;
  let page;
  let result = null;

  try {
    userAgents =
      USER_AGENT_STRINGS[Math.floor(Math.random() * USER_AGENT_STRINGS.length)];
    browser = await chromium.launch({ headless: false }); // Initialize the browser
    context = await browser.newContext({ userAgent: userAgents });
    await context.addInitScript(
      "Object.defineProperty(navigator, 'webdriver', {get: () => undefined})"
    );
    page = await context.newPage(); // Create a new page
    await page.goto(siteUrl); // Navigate to the target URL

    // Promise resolution logic
    const locator = await page.evaluate((query) => {
      return new Promise((resolve) => {
        // converts "test name" into ".test .name"
        const currentUrl = window.location.href;
        let locatorString;

        const formatClassNames = (classNames) => {
          const res = classNames
            .split(" ")
            .map((cls) => "." + cls)
            .join("");

          return res;
        };

        document.addEventListener("keydown", function (event) {
          if (event.key === "Enter") {
            const endUrl = window.location.href;
            setTimeout(() => {
              resolve({ locatorString, endUrl });
            }, 3000);
          }
        });
        document.addEventListener("mouseover", (event) => {
          const element = event.target;
          // Check if the hovered element is an input element
          if (element instanceof HTMLInputElement) {
            element.style.outline = "5px solid green";
          } else {
            element.style.outline = "5px solid red";
          }
        });
        document.addEventListener("mouseout", (event) => {
          const element = event.target;
          element.style.outline = "";
        });

        // Log detailed information on click
        document.addEventListener("click", async (event) => {
          console.log(currentUrl);
          const element = event.target;
          // Prevent default behavior and stop event propagation

          if (element instanceof HTMLInputElement) {
            element.value = query;
          }

          // Traverse up the DOM tree and build the locator string
          let counter = 0;
          let currentElement = element;
          let locatorParts = [];
          while (
            counter < 3 && // while counter is less than 3
            currentElement && // a current element exists
            currentElement.tagName !== "BODY" // and that element isn't the body tag
          ) {
            // if currentElement has a class name
            if (currentElement.className) {
              // Format class names and prepend to locator parts
              locatorParts.unshift(formatClassNames(currentElement.className));
            }
            // Move to the parent element
            currentElement = currentElement.parentElement;
            counter++;
          }

          // Join all parts with a space to create the full locator string
          locatorString = locatorParts.join(" ");
          resolve(locatorString);
        });
      });
    }, query);

    // Wait for user input and navigation
    await page.keyboard.press("Enter"); // Simulate the user pressing "Enter"
    await page.waitForNavigation({ waitUntil: "load", timeout: 3000 });

    // Once navigation is complete, get the new page's URL
    const newPageUrl = page.url();

    result = { newPageUrl, locator };
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

module.exports = { getFillLocator };
