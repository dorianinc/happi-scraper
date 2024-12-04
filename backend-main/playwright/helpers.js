fuzz = require("fuzzball");

const calculateSimilarity = (queriedName, resultName) => {
  const normalizedQueryName = queriedName.toLowerCase().trim();
  const normalizedResultName = resultName.toLowerCase().trim();
  const similarityScore = fuzz.token_set_ratio(
    normalizedQueryName,
    normalizedResultName
  );

  return similarityScore;
};

const calculateAverage = (prices) => {
  const total = prices.reduce((acc, curr) => acc + curr, 0);
  const average = total / prices.length;
  return average.toFixed(2);
};

const doesNotExist = (object) => {
  return {
    message: `${object} couldn't be found`,
  };
};

const createFinishButton = async (page) => {
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
};

const createTrackerWindow = async (page) => {
  await page.evaluate(() => {
    // Create the tracker window
    const trackerWindow = document.createElement("div");
    trackerWindow.style.position = "fixed";
    trackerWindow.style.width = "250px"; // Adjusted width
    trackerWindow.style.height = "120px"; // Adjusted height
    trackerWindow.style.top = "50px";
    trackerWindow.style.left = "150px";
    trackerWindow.style.padding = "15px 20px";
    trackerWindow.style.backgroundColor = "#F8F9FA"; // Light shade of white
    trackerWindow.style.color = "#333"; // Dark gray text
    trackerWindow.style.fontSize = "14px";
    trackerWindow.style.fontWeight = "normal";
    trackerWindow.style.border = "1px solid #DDD"; // Subtle gray border
    trackerWindow.style.borderRadius = "8px"; // Rounded corners
    trackerWindow.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)"; // Soft box shadow
    trackerWindow.style.zIndex = "10000";
    trackerWindow.style.overflow = "hidden";
    trackerWindow.id = "tracker-window";

    // Create the "# of items" indicator
    const itemCount = document.createElement("div");
    itemCount.id = "item-count";
    itemCount.style.marginBottom = "10px";
    itemCount.textContent = "# of items: 0"; // Default value
    trackerWindow.appendChild(itemCount);

    // Create the "context" indicator
    const contextIndicator = document.createElement("div");
    contextIndicator.id = "context-indicator";
    contextIndicator.textContent = "Context: "; // Default text
    trackerWindow.appendChild(contextIndicator);

    // Append the tracker window to the document body
    document.body.appendChild(trackerWindow);
  });
};




module.exports = {
  doesNotExist,
  calculateAverage,
  calculateSimilarity,
  createFinishButton,
  createTrackerWindow,
};
