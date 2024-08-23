const { Match } = require("../db");

// Get single match by id
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
    const newMatch = await Match.build(data);
    return newMatch.toJSON();
  } catch (error) {
    console.error("Error creating match:", error);
    throw new Error("Unable to create match");
  }
};

module.exports = {
  getMatchById,
  createMatch,
};
