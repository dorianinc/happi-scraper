const { ipcMain } = require("electron");
const { match } = require("../controller");

const matchIPC = () => {
  // Get single match
  ipcMain.handle("get-matches", async (_e, matchId) => {
    try {
      return await match.getMatchByProductId(matchId);
    } catch (error) {
      console.error("Error in get-single-match IPC handler:", error);
      throw error;
    }
  });

  // Create a new match
  ipcMain.handle("create-match", async (_e, matchData) => {
    try {
      return await match.createMatch(matchData);
    } catch (error) {
      console.error("Error in create-match IPC handler:", error);
      throw error;
    }
  });

  // Delete a match
  ipcMain.handle("delete-match", async (_e, matchId) => {
    try {
      return await match.deleteMatchById(matchId);
    } catch (error) {
      console.error("Error in create-match IPC handler:", error);
      throw error;
    }
  });
};

module.exports = matchIPC;
