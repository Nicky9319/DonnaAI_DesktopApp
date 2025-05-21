// Imports and modules !!! ---------------------------------------------------------------------------------------------------

import { app, shell, BrowserWindow, ipcMain, globalShortcut, contextBridge } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from './resources/icon.png?asset'

const {spawn, exec} = require('child_process');
const fs = require('fs');

const path = require('path');

const {autoUpdater, AppUpdater} = require('electron-differential-updater');
const log = require('electron-log');

const {os} = require('os');
const {url} = require('inspector');

const Docker = require('dockerode');
const docker = new Docker({ socketPath: '/var/run/docker.sock' });

import { initDb,
  getAgentsInfo,
  addAgentInfo,
  updateAgentEnvVariable} from './db/db.js';

import dotenv from 'dotenv';
dotenv.config();

import { execSync } from 'child_process';


// Imports and modules END !!! ---------------------------------------------------------------------------------------------------




// Variables and constants !!! ---------------------------------------------------------------------------------------------------

let mainWindow;
let ipAddress = process.env.SERVER_IP_ADDRESS || '';

log.transports.file.level = 'info';
autoUpdater.logger = log;

autoUpdater.autoDownload = true;
autoUpdater.autoInstallOnAppQuit = true;

// Variables and constants END !!! ---------------------------------------------------------------------------------------------------





// IPC On Section !!! ------------------------------------------------------------------------------------------------------

ipcMain.on('change-window', (event, arg) => {
  console.log("Changing The Application Window !!!!")
  window_name = "html/" + arg;
  // window_name = arg;
  mainWindow.loadFile(window_name);
})

// IPC On Section END !!! ---------------------------------------------------------------------------------------------------





// IPC Handle Section !!! ------------------------------------------------------------------------------------------------------


ipcMain.handle('get-ip-address', async (event) => {
});


ipcMain.handle('store-data', (event, key, value) => {
  storeStoreData(key, value);
});

ipcMain.handle('store-has', (event, key) => {
  return storeHas(key);
});

ipcMain.handle('get-data', (event, key) => {
  return storeGetData(key);
});

ipcMain.handle('delete-data', (event, key) => {
  storeDeleteData(key);
});


ipcMain.handle('show-dialog', async (event, dialogType, dialogTitle, dialogMessage) => {
  await dialog.showMessageBox({
    type: dialogType,
    title: dialogTitle,
    message: dialogMessage
  })

  return;
});


ipcMain.handle('start-agent', (event, agentId) => {

})

ipcMain.handle('stop-agent', (event, agentId) =>{

})

// IPC Handle Section END !!! ---------------------------------------------------------------------------------------------------







// Auto Update Section !!! -------------------------------------------------------------------------------------

autoUpdater.on('checking-for-update', () => {
  console.log("Checking for Update")
  log.info('Checking for update...');
});

autoUpdater.on('update-available', (info) => {
  // autoUpdater.downloadUpdate();
  log.info('Update available.');
});

autoUpdater.on('update-not-available', (info) => {
  log.info('Update not available.');
});

autoUpdater.on('error', (err) => {
  log.error('Error in auto-updater. ' + err);
});

autoUpdater.on('download-progress', (progressObj) => {
  let log_message = 'Download speed: ' + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + '/' + progressObj.total + ')';
  log.info(log_message);
});

autoUpdater.on('update-downloaded', (info) => {
  log.info('Update downloaded');
});

// Auto Updater Section END !!! ----------------------------------------------------------------------------------






// Electron - Store Utility Section !!! -------------------------------------------------------------------------------------

function storeStoreData(key, value) {
  store.set(key, value);
}

function storeHas(key) {
  return store.has(key);
}

function storeGetData(key) {
  return store.get(key);
}

function storeDeleteData(key) {
  store.delete(key);
}

// Electron Store Utility Section END !!! ----------------------------------------------------------------------------------





function createWindow() {
  initDb()
  .then(() => { 
    console.log('Database initialized successfully');
    addAgentInfo({ id: 1, name: 'Agent 1', env: {} })

  });
  
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1440,
    height: 1024,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/preload.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils


  // app.on('browser-window-created', (_, window) => {
  //   optimizer.watchWindowShortcuts(window)
  // })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
