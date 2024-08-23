const { ipcMain } = require("electron");
const { website } = require("../controller");

const websiteIPC = () => {
  //  Get all websites
  ipcMain.handle("get-websites", async (_e) => {
    console.log("~~~~ Handling get-websites ~~~~~")
    try {
      return await website.getWebsites();
    } catch (error) {
      console.error("Error in get-websites IPC handler:", error);
      throw error;
    }
  });

  // Update single website by id
  ipcMain.handle("update-website", async (_e, data) => {
    console.log("~~~~ Handling update-websites ~~~~~")
    try {
      return await website.updateWebsite(data);
    } catch (error) {
      console.error("Error in update-website IPC handler:", error);
      throw error;
    }
  });
};

module.exports = websiteIPC;
