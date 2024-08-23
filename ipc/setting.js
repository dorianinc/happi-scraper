const { ipcMain } = require("electron");
const { setting } = require("../controller");

const settingIPC = () => {

  //  Get all settings
  ipcMain.handle("get-settings", async (_e) => {
    try {
      return await setting.getSettings();
    } catch (error) {
      console.error("Error in get-settings IPC handler:", error);
      throw error;
    }
  });

// Checks to see if dark mode is enable
    ipcMain.handle("is-darkMode", async (_e) => {
        try {
          return await setting.isDarkMode();
        } catch (error) {
          console.error("Error in is-darkMode IPC handler:", error);
          throw error;
        }
      });

  // Update single setting by id
  ipcMain.handle("update-setting", async (_e, { data }) => {
    try {
      return await setting.updateSettings({ data });
    } catch (error) {
      console.error("Error in update-setting IPC handler:", error);
      throw error;
    }
  });
};

module.exports = settingIPC;
