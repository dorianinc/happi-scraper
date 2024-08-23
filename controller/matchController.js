const { Match } = require("../db");

// Get matches for a product
const getMatchById = async (id) => {
  try {
    const match = await Match.findByPk(id, { raw: true });
    if (!match) {
      throw new Error("Match not found");
    }
    return match;
  } catch (error) {
    console.error("Error getting match:", error);
    throw new Error("Unable to fetch match");
  }
};

// Create a new match
const createMatch = async (data) => {
  try {
    const newProduct = await Match.build({ name: productName });

    return newProduct.toJSON();
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Unable to create product");
  }
};

module.exports = {
  getMatchById,
  createMatch,
};
