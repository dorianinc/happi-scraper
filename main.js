const path = require("path");
const { app, BrowserWindow, Menu, Tray } = require("electron");
const windowStateKeeper = require("electron-window-state");
const dockIcon = path.join(__dirname, "assets", "images", "react_app_logo.png");
const trayIcon = path.join(__dirname, "assets", "images", "react_icon.png");
const db = require("./db");
const deployIPCListeners = require("./backend-main/ipc");
const seedDatabase = require("./backend-main/utils/seedDataBase");
const { store } = require("./backend-main/utils/electron-store");

const isDev = !app.isPackaged;
const isDarkMode = store.get("settings.darkMode");

const MAIN_HTML_PATH = path.join(
  __dirname,
  "frontend-renderer",
  "src",
  "public",
  "index.html"
);
const SPLASH_HTML_PATH = path.join(
  __dirname,
  "frontend-renderer",
  "src",
  "public",
  "splash.html"
);
const PRELOAD_JS_PATH = path.join(__dirname, "frontend-renderer", "preload.js");

let windowState;
let mainWindow;
let splashWindow;

if (require("electron-squirrel-startup")) app.quit();

// If development environment
if (isDev) {
  try {
    require("electron-reloader")(module, {
      debug: true,
      watchRenderer: true,
      ignore: [
        /db\/dev\.db/, // Ignore the dev.db file in the db folder
      ],
    });
  } catch (_) {
    console.log("Error");
  }
}

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
    backgroundColor: isDarkMode ? "#212121" : "#fcfcfc",
    show: false,
    webPreferences: {
      preload: PRELOAD_JS_PATH,
      contextIsolation: true,
      nodeIntegration: false,
    },
    // alwaysOnTop: isDev ? true : false,
  });

  windowState.manage(mainWindow);
  mainWindow.loadFile(MAIN_HTML_PATH);
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  return mainWindow;
};

const createSplashWindow = () => {
  windowState = windowStateKeeper();
  splashWindow = new BrowserWindow({
    x: windowState.x,
    y: windowState.y,
    frame: false,
    transparent: true,
    resizable: false,
  });

  splashWindow.loadFile(SPLASH_HTML_PATH);
  return splashWindow;
};

if (process.platform === "darwin") {
  app.dock.setIcon(dockIcon);
}
////////////////////////////////////////////////////////////////

const setTray = () => {
  let tray = null;
  const template = require("./backend-main/utils/Menu").createTemplate();
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  tray = new Tray(trayIcon);
  tray.setContextMenu(menu);
};

app.whenReady().then(() => {
  // Check the database connection before starting the app
  db.sequelize
    .sync()
    .then(() => {
      console.log("Database connected successfully.");
      seedDatabase()
        .then(() => {
          setTray();
          deployIPCListeners();

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
          console.error("Unable to seed database:", err);
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
