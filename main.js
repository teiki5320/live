const { app, BrowserWindow } = require('electron');
const path = require('path');

app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');
app.commandLine.appendSwitch('disable-background-timer-throttling');
app.commandLine.appendSwitch('disable-renderer-backgrounding');
app.commandLine.appendSwitch('disable-backgrounding-occluded-windows');

function createWindow() {
  const win = new BrowserWindow({
    width: 540,
    height: 960,
    frame: false,
    alwaysOnTop: true,
    title: 'Afrotok Live',
    backgroundColor: '#0a0a14',
    show: false, // on attend ready-to-show avant d'afficher
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      backgroundThrottling: false, // empêche le throttling RAF/timers
    },
  });

  win.loadFile(path.join(__dirname, 'index.html'));

  win.once('ready-to-show', () => {
    win.show();
  });

  // Cmd+Option+I → DevTools
  win.webContents.on('before-input-event', (event, input) => {
    if ((input.meta || input.control) && input.alt && input.key === 'i') {
      win.webContents.openDevTools({ mode: 'detach' });
    }
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
