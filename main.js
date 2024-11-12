const path = require("path");
const { app, BrowserWindow, Menu, Tray } = require("electron");
const windowStateKeeper = require("electron-window-state");
const dockIcon = path.join(__dirname, "assets", "images", "react_app_logo.png");
const trayIcon = path.join(__dirname, "assets", "images", "react_icon.png");
const db = require("./db");
const deployIPCListeners = require("./ipc");
const seedDatabase = require("./utils/seedDataBase");
const Store = require("electron-store");

const isDev = !app.isPackaged;

let windowState;
let mainWindow;
let splashWindow;

if (require("electron-squirrel-startup")) app.quit();

// // If development environment 
// if (isDev) {
//   try {
//     require('electron-reloader')(module, {
//       debug: true,
//       watchRenderer: true,
//       ignore: [
//         /db\/dev\.db/        // Ignore the dev.db file in the db folder
//       ]
//     });
//   } catch (_) {
//     console.log('Error');
//   }
// }
console.log("path ===> ", path.join(__dirname, "preload.js"))
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
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
    // alwaysOnTop: isDev ? true : false,
  });

  windowState.manage(mainWindow);
  mainWindow.loadFile("./src/public/index.html");
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
    resizable: false
  });

  splashWindow.loadFile("./src/public/splash.html");
  return splashWindow;
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
            Store.initRenderer();
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
