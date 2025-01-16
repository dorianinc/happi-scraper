const { ipcMain } = require("electron");
const { script } = require("../controller");
const { getPositions } = require("../playwright/capture-positions.js");
const { getLocators } = require("../playwright/capture-locators.js");
const { getFillLocator } = require("../playwright/capture-fill-locator.js");

const scriptIPC = () => {
  //  Get all scripts
  ipcMain.handle("get-scripts", async (_e) => {
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

  ipcMain.handle("get-fill-locator", async (_e, siteUrl, query) => {
    return await getFillLocator(siteUrl, query);
  });

  ipcMain.handle("get-locators", async (_e, siteUrl, type) => {
    return await getLocators(siteUrl, type);
  });

  //  Get single script
  ipcMain.handle("get-single-script", async (_e, scriptId) => {
    try {
      return await script.getSingleScript(scriptId);
    } catch (error) {
      console.error("Error in get-single-script IPC handler:", error);
      throw error;
    }
  });

    // Create single script by id
    ipcMain.handle("create-script", async (_e, data) => {
      try {
        const blankScript = await script.createScript();
        console.log("🖥️  blankScript: ", blankScript)
        return blankScript
      } catch (error) {
        console.error("Error in update-script IPC handler:", error);
        throw error;
      }
    });

  // Update single script by id
  ipcMain.handle("update-script", async (_e, data) => {
    try {
      return await script.updateScriptById(data);
    } catch (error) {
      console.error("Error in update-script IPC handler:", error);
      throw error;
    }
  });

  //  Delete a script
  ipcMain.handle("delete-script", async (_e, scriptId) => {
    try {
      return await script.deleteScriptById(scriptId);
    } catch (error) {
      console.error("Error in delete-script IPC handler:", error);
      throw error;
    }
  });

  // Test single script by id
  ipcMain.handle("test-script", async (_e, data) => {
    try {
      const test = await script.testScriptById(data);
      return test;
    } catch (error) {
      console.error("Error in update-script IPC handler:", error);
      throw error;
    }
  });

  // Get script Items
  ipcMain.handle("get-script-items", async (_e, siteName) => {
    try {
      return await scriptItem.getScriptItems(siteName);
    } catch (error) {
      console.error("Error in get-scripts IPC handler:", error);
      throw error;
    }
  });
};

module.exports = scriptIPC;
