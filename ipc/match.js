const { ipcMain } = require("electron");
const { match } = require("../controller");

const matchIPC = () => {
  // Get match by id
  ipcMain.handle("get-single-match", async (_e, id) => {
    try {
      return await match.getProductMatches();
    } catch (error) {
      console.error("Error in get-matches IPC handler:", error);
      throw error;
    }
  });

    // Create a new match
  ipcMain.handle("create-match", async (_e, data) => {
    try {
      return await match.createMatch(data);
    } catch (error) {
      console.error("Error in create-match IPC handler:", error);
      throw error;
    }
  });
};

module.exports = matchIPC;
