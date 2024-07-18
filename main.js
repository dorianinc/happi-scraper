const path = require("path");
const { app, BrowserWindow, Menu, Tray, ipcMain } = require("electron");
const windowStateKeeper = require("electron-window-state");
const dockIcon = path.join(__dirname, "assets", "images", "react_app_logo.png");
const trayIcon = path.join(__dirname, "assets", "images", "react_icon.png");
const potato = require("./potatowright")

let windowState;
let mainWindow;
let splashWindow;


const createWindow = () => {
  windowState = windowStateKeeper({
    defaultWidth:1315,
    defaultHeight: 775,
  });

  mainWindow = new BrowserWindow({
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
    backgroundColor: "#f2f2f2",
    show: true,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
    alwaysOnTop: true,
  });

  windowState.manage(mainWindow);
  mainWindow.loadFile("./src/public/index.html");
  mainWindow.webContents.openDevTools();
  potato();
  return mainWindow;
};


const createSplashWindow = () => {
  windowState = windowStateKeeper();
  // windowState = windowStateKeeper({
  //   defaultWidth: 1000,
  //   defaultHeight: 800,
  // });

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

let tray = null;
app.whenReady().then(() => {
  const template = require("./utils/Menu").createTemplate();
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  tray = new Tray(trayIcon);
  tray.setContextMenu(menu);
  createWindow()
})


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on( 'sync-message', (e, args) => {
  console.log(args)

  setTimeout( () => {
    e.returnValue = 'Tomato'
  }, 4000)

})
