const { ipcMain } = require("electron");
const { readFromFile } = require("../utils/helpers");


const settingIPC = () => {
  //  Get login info
  
  ipcMain.handle("get-login-info", async (_e) => {
    console.log("~~~~ Handling get-login-info ~~~~~");
    return "fuck you"
    // try {
    //   const services = getServices()
    //   return await services;
    // } catch (error) {
    //   console.error("Error in get-settings IPC handler:", error);
    //   throw error;
    // }
  });
};

module.exports = settingIPC;
