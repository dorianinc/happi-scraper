const { app, BrowserWindow } = require('electron');
const { exec } = require('child_process');

function startBackend() {
    // Start the backend on port 8000
    const backendProcess = exec('cd backend && npm run start');

    backendProcess.stdout.on('data', (data) => {
        console.log(`Backend stdout: ${data}`);
    });

    backendProcess.stderr.on('data', (data) => {
        console.error(`Backend stderr: ${data}`);
    });

    backendProcess.on('close', (code) => {
        console.log(`Backend process exited with code ${code}`);
    });
}

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        maxWidth: 1315,
        maxHeight: 775,
        minWidth: 1315,
        minHeight: 775,
        webPreferences: {
            enableRemoteModule: true
        }
    });

    // and load the index.html of the app.
    mainWindow.loadURL('http://localhost:3000');

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();
    startBackend();

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});