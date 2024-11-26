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
}


module.exports = {
  doesNotExist,
  calculateAverage,
  calculateSimilarity,
  createFinishButton,
};
