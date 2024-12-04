const { chromium } = require("playwright");
const { createFinishButton, createTrackerWindow } = require("./helpers");

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
    createTrackerWindow(page);

    // Promise resolution logic
    result = await page.evaluate(() => {
      return new Promise((resolve) => {
        const list = [];
        const itemCounter = document.getElementById("item-count");
        const contextIndicator = document.getElementById("context-indicator");
        let matchingElements = null;

        // checks to see an element should be excluded or not
        const isExcluded = (element) => {
          const excludedElements = ["end-function-button", "tracker-window"];
          for (const id of excludedElements) {
            if (element.closest(`#${id}`)) {
              return true;
            }
          }
          return false;
        };

        // converts "test name" into ".test .name"
        const formatClassNames = (classNames) => {
          const res = classNames
            .split(" ")
            .map((cls) => "." + cls)
            .join("");

          return res;
        };

        ///////////////////////////////////////////////////////////////

        document.addEventListener("mouseover", (event) => {
          const element = event.target;
          if (isExcluded(element)) return;
          element.style.outline = "2px solid red";
          contextIndicator.textContent = `Context: ${element.innerText}`;
        });

        document.addEventListener("mouseout", (event) => {
          const element = event.target;
          if (isExcluded(element)) return;
          element.style.outline = "";
        });

        // Log detailed information on click
        document.addEventListener("click", (event) => {
          const element = event.target;
          if (isExcluded(element)) return;

          // Prevent default behavior and stop event propagation
          event.preventDefault();
          // event.stopPropagation();

          // Remove the hover highlight class
          element.classList.remove("playwright-hover-highlight");

          //  Remove the hover highlight class
          if (matchingElements) {
            matchingElements.forEach((el) => {
              el.style.outline = "";
            });
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
          const locatorString = locatorParts.join(" ");

          // Log the full locator string
          console.log("Locator String:", locatorString);
          // Find all elements matching the selector
          if (element.id === "end-function-button") {
            resolve(list);
          } else {
            // query all elements with the matching locator string
            matchingElements = document.querySelectorAll(locatorString);
            itemCounter.textContent = `# of items: ${matchingElements.length}`

            // Highlight all matching elements
            matchingElements.forEach((el) => {
              el.style.outline = "2px solid red";
            });

            // Push string into array
            list.push({
              locator: locatorString,
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
