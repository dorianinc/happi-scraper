const { Match } = require("../../db");

// Get single match by id
const getMatchByProductId = async (productId) => {
  try {
    const matches = await Match.findAll({ where: { productId }, raw: true });
    if (!matches.length) {
      throw new Error("Matches not found");
    }
    return matches;
  } catch (error) {
    console.error("Error getting match:", error);
    throw new Error("Unable to fetch match");
  }
};

// Create a new match
const createMatch = async (matchData) => {
  try {
    await Match.create(matchData);
  } catch (error) {
    console.error("Error creating match:", error);
    throw new Error("Unable to create match");
  }
};

// Delete a match
const deleteMatchById = async (matchId) => {
  try {
    const match = await Match.findByPk(matchId);
    if (!match) {
      throw new Error(`Match was not found`);
    }

    await match.destroy();
    return {
      success: true,
      message: "Successfully deleted",
    };
  } catch (error) {
    console.error("Error deleting match:", error);
    throw new Error("Unable to delete match");
  }
};

module.exports = {
  getMatchByProductId,
  createMatch,
  deleteMatchById,
};
