const path = require("path");
const { scrapeForPrices } = require("./scraper");
const { app, BrowserWindow, Menu, Tray, ipcMain } = require("electron");
const windowStateKeeper = require("electron-window-state");
const dockIcon = path.join(__dirname, "assets", "images", "react_app_logo.png");
const trayIcon = path.join(__dirname, "assets", "images", "react_icon.png");
const db = require("./db");
const productIPC = require("./ipc/product");
const matchIPC = require("./ipc/match");
const websiteIPC = require("./ipc/website");
const settingIPC = require("./ipc/setting");

// Load environment variables
require("dotenv").config();

let windowState;
let mainWindow;
let splashWindow;

if (require("electron-squirrel-startup")) app.quit();

const createMainWindow = () => {
  windowState = windowStateKeeper({
    defaultWidth: 1315,
    defaultHeight: 775,
  });

  mainWindow = new BrowserWindow({
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
    backgroundColor: "#f2f2f2",
    show: false,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
    alwaysOnTop: true,
  });

  windowState.manage(mainWindow);
  mainWindow.loadFile("./src/public/index.html");
  mainWindow.webContents.openDevTools();
  return mainWindow;
};

const createSplashWindow = () => {
  windowState = windowStateKeeper();

  splashWindow = new BrowserWindow({
    x: windowState.x,
    y: windowState.y,
    width: 600,
    height: 400,
    backgroundColor: "#6e707e",
    frame: false,
    transparent: true,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
  });

  splashWindow.loadFile("./src/public/splash.html");
  return splashWindow;
};

if (process.platform === "darwin") {
  app.dock.setIcon(dockIcon);
}
//------------------------------------------------------------------//
// IPC Communcations Code ...

ipcMain.handle("scrape-for-pricess", async (e, product) => {
  console.log("handling it.....");
  const prices = await scrapeForPrices(product);
  return prices; // Just return the value directly
});

//------------------------------------------------------------------//

const setTray = () => {
  let tray = null;
  const template = require("./utils/Menu").createTemplate();
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  tray = new Tray(trayIcon);
  tray.setContextMenu(menu);
};

app.whenReady().then(() => {
  // Check the database connection before starting the app
  db.sequelize
    .authenticate()
    .then(() => {

      console.log("Database connected successfully.");
      setTray();
      productIPC()
      matchIPC()
      websiteIPC()
      settingIPC()

      const splash = createSplashWindow();
      const mainApp = createMainWindow();
      mainApp.once("ready-to-show", () => {
        setTimeout(() => {
          splash.destroy();
          mainApp.show();
        }, 1000);
      });

    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
