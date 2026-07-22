const { app, BrowserWindow, Menu, dialog } = require('electron');

const TARGET_URL = 'http://192.168.214.4';

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    title: 'Medeesoft',
    icon: __dirname + '/build/icon.ico',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  Menu.setApplicationMenu(null);

  mainWindow.loadURL(TARGET_URL);

  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    dialog.showMessageBox(mainWindow, {
      type: 'error',
      title: 'เชื่อมต่อไม่สำเร็จ',
      message: `เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ (${TARGET_URL})\n\nกรุณาตรวจสอบว่าเครื่องนี้อยู่ในเครือข่ายเดียวกับเซิร์ฟเวอร์ Medeesoft\n\nรายละเอียด: ${errorDescription}`,
      buttons: ['ลองใหม่', 'ปิด'],
    }).then((result) => {
      if (result.response === 0) {
        mainWindow.loadURL(TARGET_URL);
      }
    });
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
