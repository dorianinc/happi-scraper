const { ipcMain } = require("electron");
const { searchTarget } = require("../controller");

const searchTargetIPC = () => {
  //  Get all searchTargets
  ipcMain.handle("get-searchTargets", async (_e) => {
    console.log("~~~~ Handling get-searchTargets ~~~~~")
    try {
      return await searchTarget.getSearchTargets();
    } catch (error) {
      console.error("Error in get-searchTargets IPC handler:", error);
      throw error;
    }
  });

  // Update single searchTarget by id
  ipcMain.handle("update-searchTarget", async (_e, data) => {
    console.log("~~~~ Handling update-searchTargets ~~~~~")
    try {
      return await searchTarget.updateSearchTarget(data);
    } catch (error) {
      console.error("Error in update-searchTarget IPC handler:", error);
      throw error;
    }
  });
};

module.exports = searchTargetIPC;
