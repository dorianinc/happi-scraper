const path = require("path");
const { app, BrowserWindow, Menu, Tray } = require("electron");
const windowStateKeeper = require("electron-window-state");
const dockIcon = path.join(__dirname, "assets", "images", "react_app_logo.png");
const trayIcon = path.join(__dirname, "assets", "images", "react_icon.png");

const isDev = !app.isPackaged;

let windowState;
let mainWindow;

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
    backgroundColor: "#f2f2f2",
    show: false,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
    alwaysOnTop: isDev ? true : false,
  });

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

const setTray = () => {
  let tray = null;
  const template = require("./utils/Menu").createTemplate();
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  tray = new Tray(trayIcon);
  tray.setContextMenu(menu);
};

app.whenReady().then(() => {
  setTray();

  const mainApp = createMainWindow();
  mainApp.once("ready-to-show", () => {
    mainApp.show();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
