const { ipcMain } = require("electron");
const { script } = require("../controller");
const { getPositions } = require("../playwright/capture-positions.js");
const { getLocators } = require("../playwright/capture-locators.js");



const scriptIPC = () => {
  //  Get all scripts
  ipcMain.handle("get-scripts", async (_e) => {
    console.log("~~~~ Handling get-scripts  ~~~~~")
    try {
      return await script.getScripts();
    } catch (error) {
      console.error("Error in get-scripts IPC handler:", error);
      throw error;
    }
  });

  ipcMain.handle("get-coordinates", async (_e, siteUrl) => {
    return await getPositions(siteUrl);
  });

  ipcMain.handle("get-locators", async (_e, siteUrl, type) => {
    return await getLocators(siteUrl, type);
  });

    //  Get single script
    ipcMain.handle("get-single-script", async (_e, productId) => {
      console.log("~~~~ Handling get-single-script  ~~~~~")
      try {
        return await script.getSingleScript(productId);
      } catch (error) {
        console.error("Error in get-single-product IPC handler:", error);
        throw error;
      }
    });

  // Update single script by id
  ipcMain.handle("update-script", async (_e, data) => {
    console.log("~~~~ Handling update-scripts ~~~~~")
    try {
      return await script.updateScript(data);
    } catch (error) {
      console.error("Error in update-script IPC handler:", error);
      throw error;
    }
  });

  // Get script Items
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
