const { ipcMain } = require("electron");
const { searchTarget } = require("../controller");

const searchTargetIPC = () => {
  //  Get all searchTargets
  ipcMain.handle("get-search-targets", async (_e) => {
    console.log("~~~~ Handling get-searchTargets ~~~~~")
    try {
      return await searchTarget.getTargets();
    } catch (error) {
      console.error("Error in get-searchTargets IPC handler:", error);
      throw error;
    }
  });

    //  Get single target
    ipcMain.handle("get-single-search-target", async (_e, productId) => {
      console.log("~~~~ 😀😀 Handling get-single-searchTarget 😀😀 ~~~~~")
      try {
        return await searchTarget.getSingleTarget(productId);
      } catch (error) {
        console.error("Error in get-single-product IPC handler:", error);
        throw error;
      }
    });

  // Update single searchTarget by id
  ipcMain.handle("update-search-target", async (_e, data) => {
    console.log("~~~~ Handling update-searchTargets ~~~~~")
    try {
      return await searchTarget.updateTarget(data);
    } catch (error) {
      console.error("Error in update-searchTarget IPC handler:", error);
      throw error;
    }
  });
};

module.exports = searchTargetIPC;
