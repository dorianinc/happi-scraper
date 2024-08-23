const { Match } = require("../db");

// Get single match by id
const getMatchById = async (MatchId) => {
  try {
    const match = await Match.findByPk(MatchId, { raw: true });
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
const createMatch = async (matchData) => {
  console.log("match data 👾: ", matchData)
  try {
    const newMatch = await Match.create(matchData);
    console.log("🖥️  newMatch.toJSON(): ", newMatch.toJSON())
  } catch (error) {
    console.error("Error creating match:", error);
    throw new Error("Unable to create match");
  }
};

module.exports = {
  getMatchById,
  createMatch,
};
