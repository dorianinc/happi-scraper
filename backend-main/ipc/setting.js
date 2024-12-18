const { ipcMain } = require("electron");
const {
  getSettings,
  updateSettings,
  isDarkMode,
} = require("../controller/settingController");

const settingIPC = () => {
  // Get settings from store
  ipcMain.handle("get-settings", async (_e) => {
    console.log("~~~~ Handling get-settings ~~~~");
    try {
      const settings = getSettings();
      return settings;
    } catch (error) {
      console.error("Error in get-settings-data:", error);
      res.success = false;
      res.error = "Failed to get settings.";
      return res;
    }
  });

  // Save settings to store
  ipcMain.handle("update-setting", async (_e, data) => {
    console.log("~~~~ Handling update-settings ~~~~");
    try {
      const newSettings = updateSettings(data);
      return newSettings;
    } catch (error) {
      console.error("Error in save-settings-data:", error);
      res.success = false;
      res.error = "Failed to save settings.";
      return res;
    }
  });

};

module.exports = settingIPC;
