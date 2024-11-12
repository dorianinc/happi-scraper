const { contextBridge, ipcRenderer } = require("electron");

// invoke --> executes immediately and returns a promise with the result
// on --> sets up a listener that persists and waits for the event to trigger

contextBridge.exposeInMainWorld("api", {
  product: {
    getProducts: async (data) => {
      return ipcRenderer.invoke("get-products", data);
    },
    getProductCount: async () => {
      return ipcRenderer.invoke("get-product-count");
    },
    getSingleProduct: async (productId) => {
      return ipcRenderer.invoke("get-single-product", productId);
    },
    createProduct: async (productName) => {
      return ipcRenderer.invoke("create-product", productName);
    },
    deleteProduct: async (productId) => {
      return ipcRenderer.invoke("delete-product", productId);
    },
  },
  script: {
    getScripts: async () => {
      return ipcRenderer.invoke("get-scripts");
    },
    getSingleScript: async (scriptId) => {
      return ipcRenderer.invoke("get-single-script", scriptId);
    },
    updateScript: async ({ scriptId, updatedScript, scriptItems }) => {
      return ipcRenderer.invoke("update-script", {
        scriptId,
        updatedScript,
        scriptItems,
      });
    },
    getScriptItems: async (siteName) => {
      return ipcRenderer.invoke("get-script-items", siteName);
    },
    getCoordinates: async () => ipcRenderer.invoke("get-coordinates"),
  },
  settings: {
    getSettings: async () => {
      return ipcRenderer.invoke("get-settings");
    },
    getDarkMode: async () => {
      return ipcRenderer.invoke("get-settings");
    },
    updateSettings: async (settingsData) => {
      return ipcRenderer.invoke("update-setting", settingsData);
    },
  },
  app: {
    sayHello: async () => {
      return ipcRenderer.invoke("say-hello");
    },
  },
});
