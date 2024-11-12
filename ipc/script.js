const { ipcMain } = require("electron");
const { script } = require("../controller");
const { getPositions } = require("../utils/capture-positions.js");


const scriptIPC = () => {
  //  Get all scripts
  ipcMain.handle("get-scripts", async (_e) => {
    console.log("~~~~ Handling get-scripts  ~~~~~")
    try {
      const res =  await script.getScripts();
      return res;
    } catch (error) {
      console.error("Error in get-scripts IPC handler:", error);
      throw error;
    }
  });

  ipcMain.handle("say-hello", async (_e) => {
    const positions = await getPositions();
    console.log("🖥️  positions: ", positions)
  });

    //  Get single script
    ipcMain.handle("get-single-script", async (_e, productId) => {
      console.log("~~~~ Handling get-single-script  ~~~~~")
      try {
        const res = await script.getSingleScript(productId);
        console.log("🖥️  res: ", res)
        return res
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
};

module.exports = scriptIPC;
