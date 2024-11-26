const { chromium } = require("playwright");
const { createFinishButton } = require("./helpers");

const getLocators = async (siteUrl) => {
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
        const list = [];

        document.addEventListener("mouseover", (event) => {
          const element = event.target;
          if (element.id === "end-function-button") return;
          element.style.outline = "2px solid red";
        });

        document.addEventListener("mouseout", (event) => {
          const element = event.target;
          if (element.id === "end-function-button") return;

          element.style.outline = null;
        });

        // Log detailed information on click
        let matchingElements = null;
        document.addEventListener("click", (event) => {
          const element = event.target;

          // Prevent default behavior and stop event propagation
          event.preventDefault();
          // event.stopPropagation();

          // Remove the hover highlight class
          element.classList.remove("playwright-hover-highlight");

          if (matchingElements) {
            matchingElements.forEach((el) => {
              el.style.outline = null;
            });
          }

          // Function to format individual class names and combine them
          function formatClassNames(classNames) {
            return classNames
              .split(" ")
              .map((cls) => "." + cls)
              .join("");
          }

          // Traverse up the DOM tree and build the locator string
          let counter = 0;
          let currentElement = element;
          let locatorParts = [];
          while (
            counter < 3 &&
            currentElement &&
            currentElement.tagName !== "BODY"
          ) {
            console.log("counter ====> ", counter);
            if (currentElement.className) {
              // Format class names and prepend to locator parts
              locatorParts.unshift(formatClassNames(currentElement.className));
            }
            // Move to the parent element
            currentElement = currentElement.parentElement;
            counter++;
          }

          // Join all parts with a space to create the full locator string
          const locatorString = locatorParts.join(" ");

          // Log the full locator string
          console.log("Locator String:", locatorString);
          // Find all elements matching the selector
          if (element.id === "end-function-button") {
            resolve(list);
          } else {
            matchingElements = document.querySelectorAll(locatorString);

            // Highlight all matching elements
            matchingElements.forEach((el) => {
              el.style.outline = "2px solid red";
            });
            list.push({
              locator: locatorString, // Always return position data
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

module.exports = { getLocators };
