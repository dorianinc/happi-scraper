const { ipcMain } = require("electron");
const { scriptItem } = require("../controller");

const scriptIPC = () => {
  //  Get all scripts
  ipcMain.handle("get-script-items", async (_e, siteName) => {
    console.log("~~~~ Handling get-script-items  ~~~~~");
    try {
      return await scriptItem.getScriptItems(siteName);
    } catch (error) {
      console.error("Error in get-scripts IPC handler:", error);
      throw error;
    }
  });
};

module.exports = scriptIPC;
