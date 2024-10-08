const { ipcMain } = require("electron");
const { setting } = require("../controller");

const settingIPC = () => {
  //  Get all settings
  ipcMain.handle("get-settings", async (_e) => {
    console.log("~~~~ Handling get-settings ~~~~~")
    try {
      return await setting.getSettings();
    } catch (error) {
      console.error("Error in get-settings IPC handler:", error);
      throw error;
    }
  });

  // Checks to see if dark mode is enable
  ipcMain.handle("is-darkMode", async (_e) => {
    console.log("~~~~ Handling is-darkMode ~~~~~")

    try {
      return await setting.isDarkMode();
    } catch (error) {
      console.error("Error in is-darkMode IPC handler:", error);
      throw error;
    }
  });

  // Update single setting by id
  ipcMain.handle("update-setting", async (_e, settingsData) => {
    try {
      return await setting.updateSettings(settingsData);
    } catch (error) {
      console.error("Error in update-setting IPC handler:", error);
      throw error;
    }
  });
};

module.exports = settingIPC;
