const { contextBridge, ipcRenderer } = require('electron');
const { getServices } = require('./utils/scraper');
console.log("IN THE PRELOAD FILE -----------------------------")
// contextBridge.exposeInMainWorld('api', {
//   getServices: () => getServices(),
//   getLoginInfo: () => ipcRenderer.invoke('get-login-info'),
// });