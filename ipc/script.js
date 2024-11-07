const { ipcMain } = require("electron");
const { script } = require("../controller");

const scriptIPC = () => {
  //  Get all scripts
  ipcMain.handle("get-scripts", async (_e) => {
    console.log("~~~~ Handling get-scripts ~~~~~")
    try {
      return await script.getTargets();
    } catch (error) {
      console.error("Error in get-scripts IPC handler:", error);
      throw error;
    }
  });

    //  Get single target
    ipcMain.handle("get-single-script", async (_e, productId) => {
      console.log("~~~~ 😀😀 Handling get-single-script 😀😀 ~~~~~")
      try {
        return await script.getSingleTarget(productId);
      } catch (error) {
        console.error("Error in get-single-product IPC handler:", error);
        throw error;
      }
    });

  // Update single script by id
  ipcMain.handle("update-script", async (_e, data) => {
    console.log("~~~~ Handling update-scripts ~~~~~")
    try {
      return await script.updateTarget(data);
    } catch (error) {
      console.error("Error in update-script IPC handler:", error);
      throw error;
    }
  });
};

module.exports = scriptIPC;
