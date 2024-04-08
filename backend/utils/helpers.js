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

module.exports = {
  doesNotExist,
  calculateAverage,
  calculateSimilarity
};
