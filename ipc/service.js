const { ipcMain } = require("electron");
const { readFromFile } = require("../utils/helpers");

const serviceIPC = () => {
  //  Get login info
  ipcMain.handle("get-login-info", async (_e) => {
    console.log("~~~~ Handling get-info ~~~~~");
    try {
      const data = readFromFile("login.txt");
      return await data
    } catch (error) {
      console.error("Error in get-settings IPC handler:", error);
      throw error;
    }
  });
};

module.exports = serviceIPC;
