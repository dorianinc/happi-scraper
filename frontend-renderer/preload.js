const { contextBridge, ipcRenderer } = require("electron");

// invoke --> executes immediately and returns a promise with the result
// on --> sets up a listener that persists and waits for the event to trigger

contextBridge.exposeInMainWorld("api", {
  product: {
    getProducts: async (data) => ipcRenderer.invoke("get-products", data),
    getProductCount: async () => ipcRenderer.invoke("get-product-count"),
    getSingleProduct: async (data) =>
      ipcRenderer.invoke("get-single-product", data),
    createProduct: async (data) => ipcRenderer.invoke("create-product", data),
    updateProduct: async (data) => ipcRenderer.invoke("update-product", data),
    deleteProduct: async (data) => ipcRenderer.invoke("delete-product", data),
  },
  match: {
    getMatches: async (data) => ipcRenderer.invoke("get-matches", data),
    deleteMatch: async (data) => ipcRenderer.invoke("delete-match", data),
  },
  script: {
    getScripts: async () => ipcRenderer.invoke("get-scripts"),
    getSingleScript: async (data) =>
      ipcRenderer.invoke("get-single-script", data),
    createScript: async (data) => ipcRenderer.invoke("create-script", data),
    updateScript: async (data) => ipcRenderer.invoke("update-script", data),
    deleteScript: async (data) => ipcRenderer.invoke("delete-script", data),
    getScriptItems: async (data) =>
      ipcRenderer.invoke("get-script-items", data),
    getCoordinates: async (data) => ipcRenderer.invoke("get-coordinates", data),
    getLocators: async (data, type) =>
      ipcRenderer.invoke("get-locators", data, type),
    getFillLocator: async (data, query) =>
      ipcRenderer.invoke("get-fill-locator", data, query),
    testScript: async (data) => ipcRenderer.invoke("test-script", data),
  },
  settings: {
    getSettings: async () => ipcRenderer.invoke("get-settings"),
    getDarkMode: async () => ipcRenderer.invoke("is-darkMode"),
    updateSettings: async (data) => ipcRenderer.invoke("update-setting", data),
  },
});
