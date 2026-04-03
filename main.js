const { app, BrowserWindow } = require('electron');

// Autoriser l'autoplay audio sans geste utilisateur (résout AudioContext suspendu)
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

function createWindow() {
  const win = new BrowserWindow({
    width: 540,
    height: 960,
    frame: false,
    alwaysOnTop: true,
    title: 'Afrotok Live',
    backgroundColor: '#0a0a14',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadFile('index.html');

  // Cmd+Option+I → DevTools (debug)
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
