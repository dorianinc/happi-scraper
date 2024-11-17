const { ipcMain } = require("electron");
const { match } = require("../controller");

const matchIPC = () => {
  // Get single match
  ipcMain.handle("get-single-match", async (_e, MatchId) => {
    console.log("~~~~ Handling get-single-match ~~~~~")
    try {
      return await match.getMatchById(MatchId);
    } catch (error) {
      console.error("Error in get-single-match IPC handler:", error);
      throw error;
    }
  });

    // Create a new match
  ipcMain.handle("create-match", async (_e, matchData) => {
    console.log("~~~~ Handling create-match ~~~~~")
    try {
      return await match.createMatch(matchData);
    } catch (error) {
      console.error("Error in create-match IPC handler:", error);
      throw error;
    }
  });
};

module.exports = matchIPC;
