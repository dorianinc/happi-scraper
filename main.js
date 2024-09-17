const path = require("path");
const { app, BrowserWindow, Menu, Tray, ipcMain } = require("electron");
const windowStateKeeper = require("electron-window-state");
const { createTemplate } = require("./utils/Menu");
const dockIcon = path.join(__dirname, "assets", "images", "react_app_logo.png");
const trayIcon = path.join(__dirname, "assets", "images", "react_icon.png");

const isDev = !app.isPackaged;

let windowState;
let mainWindow;
let modal;

if (require("electron-squirrel-startup")) app.quit();

const createMainWindow = () => {
  windowState = windowStateKeeper({
    defaultHeight: 775,
    defaultWidth: 1315,
  });

  mainWindow = new BrowserWindow({
    x: windowState.x,
    y: windowState.y,
    height: windowState.height,
    width: windowState.width,
    backgroundColor: "#212529",
    show: false,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
    // alwaysOnTop: isDev ? true : false,
  });

  modal = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    show: false,
    height: 500,
    width: 400,
    autoHideMenuBar: true,
    alwaysOnTop: isDev ? true : false,
    transparent: true,
  });

  modal.loadFile("./settings.html");

  windowState.manage(mainWindow);
  mainWindow.loadFile("./index.html");
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  return mainWindow;
};

if (process.platform === "darwin") {
  app.dock.setIcon(dockIcon);
}
////////////////////////////////////////////////////////////////

const openSettings = () => {
  const mainBounds = mainWindow.getBounds();
  const modalBounds = modal.getBounds();

  // Calculate the position to center the modal window within the main window
  const modalX = Math.round(
    mainBounds.x + (mainBounds.width - modalBounds.width) / 2
  );
  const modalY = Math.round(
    mainBounds.y + (mainBounds.height - modalBounds.height) / 2
  );

  // Set the position of the modal window
  modal.setPosition(modalX, modalY);
  modal.show();
};

const setTray = (app, openSettings) => {
  let tray = null;
  const template = createTemplate(app, openSettings);
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  tray = new Tray(trayIcon);
  tray.setContextMenu(menu);
};

app.whenReady().then(() => {
  const mainApp = createMainWindow();
  mainApp.once("ready-to-show", () => {
    mainApp.show();
  });

  setTray(app, openSettings);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
