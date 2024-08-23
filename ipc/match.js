const { ipcMain } = require("electron");
const { match } = require("../controller");

const matchIPC = () => {
  // Get matches for a product
  ipcMain.handle("get-matches", async (_e) => {
    try {
      return await match.getProductMatches();
    } catch (error) {
      console.error("Error in get-matches IPC handler:", error);
      throw error;
    }
  });
};

module.exports = matchIPC;
