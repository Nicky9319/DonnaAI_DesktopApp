// Imports and modules !!! ---------------------------------------------------------------------------------------------------

import { app, shell, BrowserWindow, ipcMain, globalShortcut, contextBridge, Tray, Menu } from 'electron'
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

let mainWindow, store, widgetWindow, setupWindow, tray;
let ipAddress = process.env.SERVER_IP_ADDRESS || '';
let widgetUndetectabilityEnabled = true; // Enable undetectability for widget by default

log.transports.file.level = 'info';
autoUpdater.logger = log;

autoUpdater.autoDownload = true;
autoUpdater.autoInstallOnAppQuit = true;

// Platform detection
const isMac = process.platform === 'darwin';
const isWindows = process.platform === 'win32';
const isLinux = process.platform === 'linux';
const isDev = process.env.NODE_ENV === 'development';

// Variables and constants END !!! ---------------------------------------------------------------------------------------------------





// IPC On Section !!! ------------------------------------------------------------------------------------------------------

ipcMain.on('change-window', (event, arg) => {
  console.log("Changing The Application Window !!!!")
  window_name = "html/" + arg;
  // window_name = arg;
  mainWindow.loadFile(window_name);
})

// IPC On Section END !!! ---------------------------------------------------------------------------------------------------





// Window Creation Functions !!! ------------------------------------------------------------------------------------------------------

// Setup window creation function
function createSetupWindow() {
  console.log('Creating setup window...');
  setupWindow = new BrowserWindow({
    width: 600,
    height: 400,
    show: false,
    frame: false, // Remove default titlebar
    autoHideMenuBar: true,
    resizable: false,
    center: true,
    webPreferences: {
      preload: join(__dirname, '../preload/preload.js'),
      sandbox: false,
      contextIsolation: true,
      devTools: true,
    },
  });

  setupWindow.on('ready-to-show', () => {
    setupWindow.show();
  });

  // Loading HTML and Configuring the Setup Window
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    const baseUrl = process.env['ELECTRON_RENDERER_URL'];
    const setupUrl = baseUrl.endsWith('/') ? baseUrl + '?setup=true' : baseUrl + '/?setup=true';
    console.log('Loading setup window from:', setupUrl);
    setupWindow.loadURL(setupUrl);
  } else {
    const setupPath = join(__dirname, '../renderer/index.html');
    console.log('Loading setup window from:', setupPath);
    setupWindow.loadFile(setupPath);
  }

  setupWindow.setMenuBarVisibility(false);

  // Handle setup window close event
  setupWindow.on('close', (event) => {
    if (!app.isQuiting) {
      event.preventDefault();
      // If setup window is closed without continuing, quit the app
      app.quit();
    }
  });
}

// Undetectable Widget Window Class !!! ---------------------------------------------------------------------------------------------------

class UndetectableWidgetWindow {
  window;
  undetectabilityEnabled;
  devToolsOpen;

  constructor(options = {}) {
    this.undetectabilityEnabled = options.undetectabilityEnabled || true;
    this.devToolsOpen = false;
    
    // Create widget window with undetectability features
    this.window = new BrowserWindow({
      width: 1920,
      height: 1080,
      frame: false,
      alwaysOnTop: true,
      skipTaskbar: this.undetectabilityEnabled, // Hide from taskbar when undetectable
      resizable: false,
      transparent: true,
      hasShadow: false,
      show: false, // Don't show until ready
      fullscreen: true,
      type: "panel", // Special window type for undetectability
      roundedCorners: false,
      minimizable: false,
      hiddenInMissionControl: true, // macOS: hide from Mission Control
      webPreferences: {
        preload: join(__dirname, '../preload/preload.js'),
        sandbox: false,
        contextIsolation: true,
        devTools: true,
        nodeIntegration: false,
      }
    });

    // Set content protection if undetectability is enabled
    if (this.undetectabilityEnabled) {
      this.window.setContentProtection(true);
    }

    // Additional undetectability measures
    this.window.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
    this.window.setResizable(false);

    // Platform-specific settings
    if (isWindows) {
      this.window.setAlwaysOnTop(true, "screen-saver", 1);
      this.window.webContents.setBackgroundThrottling(false);
    }

    // Set initial mouse event ignoring - start with click-through enabled
    this.setIgnoreMouseEvents(true, { forward: true });

    // Event handlers
    this.setupEventHandlers();
  }

  setupEventHandlers() {
    // Track DevTools open state
    this.window.webContents.on('devtools-opened', () => {
      if (this.window && !this.window.isDestroyed()) {
        this.devToolsOpen = true;
        this.window.setIgnoreMouseEvents(false);
        console.log('DevTools opened: Widget window is now interactive.');
      }
    });

    this.window.webContents.on('devtools-closed', () => {
      if (this.window && !this.window.isDestroyed()) {
        this.devToolsOpen = false;
        this.window.setIgnoreMouseEvents(true, { forward: true });
        console.log('DevTools closed: Widget window is now click-through.');
      }
    });

    // Widget window event handlers
    this.window.on('ready-to-show', () => {
      console.log('Widget window ready to show');
      if (this.window && !this.window.isDestroyed()) {
        this.window.hide();
        if (!this.devToolsOpen) {
          this.window.setIgnoreMouseEvents(true, { forward: true });
        }
        this.window.setAlwaysOnTop(true, 'screen-saver');
      }
    });

    this.window.on('show', () => {
      console.log('Widget window shown, ensuring click-through');
      if (this.window && !this.window.isDestroyed()) {
        if (!this.devToolsOpen) {
          this.window.setIgnoreMouseEvents(true, { forward: true });
        }
        this.window.setAlwaysOnTop(true, 'screen-saver');
        // Force focus and bring to front
        setTimeout(() => {
          if (this.window && !this.window.isDestroyed()) {
            this.window.focus();
            this.window.setAlwaysOnTop(false); // Reset
            this.window.setAlwaysOnTop(true, 'screen-saver'); // Re-apply
          }
        }, 50);
      }
    });

    this.window.on('focus', () => {
      if (this.window && !this.window.isDestroyed()) {
        this.window.setAlwaysOnTop(true, 'screen-saver');
      }
    });

    this.window.on('closed', () => {
      console.log('Widget window closed');
    });

    // Listen for mouse events to enable/disable click-through dynamically
    this.window.webContents.on('dom-ready', () => {
      try {
        this.window.webContents.executeJavaScript(`
        // Track click-through state
        window.isClickThroughEnabled = false;
        
        // Function to enable click-through
        window.enableClickThrough = () => {
          window.isClickThroughEnabled = true;
          console.log('Click-through enabled via renderer');
        };
        
        // Function to disable click-through
        window.disableClickThrough = () => {
          window.isClickThroughEnabled = false;
          console.log('Click-through disabled via renderer');
        };
        
        // Function to toggle click-through
        window.toggleClickThrough = () => {
          window.isClickThroughEnabled = !window.isClickThroughEnabled;
          console.log('Click-through toggled:', window.isClickThroughEnabled);
        };
        
        // Expose functions globally
        window.widgetClickThrough = {
          enable: window.enableClickThrough,
          disable: window.disableClickThrough,
          toggle: window.toggleClickThrough,
          isEnabled: () => window.isClickThroughEnabled
        };
        
        console.log('Widget click-through functions initialized');
        `);
      } catch (error) {
        console.error('Error setting up widget click-through functions:', error);
      }
    });
  }

  setIgnoreMouseEvents(ignore, options = {}) {
    console.log(`[UndetectableWidgetWindow] Setting ignore mouse events: ${ignore}`);
    
    // When ignore is true, we want click-through (forward events to underlying apps)
    // When ignore is false, we want interaction with our window
    this.window.setIgnoreMouseEvents(ignore, { 
      forward: options.forward || true,
      ignore: ignore 
    });
    
    // Additional settings for better click-through behavior
    if (ignore) {
      // When click-through is enabled, ensure window doesn't steal focus
      this.window.setFocusable(false);
      this.window.setFocusable(true);
    }
  }

  setContentProtection(enabled) {
    this.window.setContentProtection(enabled);
  }

  toggleUndetectability() {
    this.undetectabilityEnabled = !this.undetectabilityEnabled;
    this.setContentProtection(this.undetectabilityEnabled);
    this.window.setSkipTaskbar(this.undetectabilityEnabled);
    
    // Ensure window stays fullscreen when toggling undetectability
    if (this.window.isFullScreen()) {
      this.window.setFullScreen(true);
    }
    
    return this.undetectabilityEnabled;
  }

  show() {
    this.window.show();
  }

  hide() {
    this.window.hide();
  }

  focus() {
    this.window.focus();
  }

  close() {
    this.window.close();
  }

  minimize() {
    this.window.minimize();
  }

  maximize() {
    this.window.maximize();
  }

  isDestroyed() {
    return this.window.isDestroyed();
  }

  isVisible() {
    return this.window.isVisible();
  }

  isMaximized() {
    return this.window.isMaximized();
  }

  reload() {
    this.window.reload();
  }

  toggleDevTools() {
    if (this.window.webContents.isDevToolsOpened()) {
      this.window.webContents.closeDevTools();
    } else {
      this.window.webContents.openDevTools({ mode: 'detach' });
    }
  }

  sendToWebContents(channel, data) {
    if (!this.window.isDestroyed()) {
      this.window.webContents.send(channel, data);
    }
  }
}

// Undetectable Widget Window Class END !!! ---------------------------------------------------------------------------------------------------

function createWidgetWindow() {
  // Check if widget window already exists and is not destroyed
  if (widgetWindow && !widgetWindow.isDestroyed()) {
    console.log('Widget window already exists, focusing it');
    try {
      widgetWindow.focus();
    } catch (error) {
      console.error('Error focusing widget window:', error);
    }
    return;
  }

  // Create widget window using the undetectable window class
  widgetWindow = new UndetectableWidgetWindow({
    undetectabilityEnabled: widgetUndetectabilityEnabled
  });

  // Load the widget window with proper React support
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    const baseUrl = process.env['ELECTRON_RENDERER_URL'];
    const widgetUrl = baseUrl.endsWith('/') ? baseUrl + '?widget=true' : baseUrl + '/?widget=true';
    console.log('Widget URL:', widgetUrl);
    widgetWindow.window.loadURL(widgetUrl).catch((error) => {
      console.error('Failed to load widget URL:', error);
    });
  } else {
    widgetWindow.window.loadFile(join(__dirname, '../widget/index.html')).catch((error) => {
      console.error('Failed to load widget file:', error);
    });
  }

  widgetWindow.window.setMenuBarVisibility(false);
  widgetWindow.window.setPosition(0, 0);
  widgetWindow.window.setSize(1200, 800);
}

// Function to safely recreate widget window
function recreateWidgetWindow() {
  try {
    if (widgetWindow && !widgetWindow.isDestroyed()) {
      widgetWindow.close();
    }
    setTimeout(() => {
      createWidgetWindow();
    }, 100);
  } catch (error) {
    console.error('Error recreating widget window:', error);
  }
}

// Function to create main and widget windows
function createMainAndWidgetWindows() {
  // Creating Main Window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    frame: false, // Remove default titlebar
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/preload.js'),
      sandbox: false,
      contextIsolation: true,
      devTools: true,
    },
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  // Loading HTML and Configuring the Main Window
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }

  mainWindow.setMenuBarVisibility(false);

  // Handle main window close event - hide instead of quit
  mainWindow.on('close', (event) => {
    if (!app.isQuiting) {
      event.preventDefault();
      mainWindow.hide();
    }
  });

  // Create widget window
  createWidgetWindow();

  // Create tray
  createTray();

  // Register Protocol with the Windows
  if (process.platform === 'win32') {
    const urlArg = process.argv.find(arg => arg.startsWith('agentbed://'));
    if (urlArg) {
      mainWindow.webContents.once('did-finish-load', () => {
        handleWebEventTrigger(urlArg)
      });
    }
  }
}

// Window Creation Functions END !!! ------------------------------------------------------------------------------------------------------

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



ipcMain.handle('db:getAgentsInfo', async () => {
  return await getAgentsInfo();
});

// Add a new agent
ipcMain.handle('db:addAgentInfo', async (event, agentInfo) => {
  return await addAgentInfo(agentInfo);
});

// New handler for updating environment variables
ipcMain.handle('db:updateAgentEnv', async (event, agentId, varName, varValue) => {
  return await updateAgentEnvVariable(agentId, varName, varValue);
});

// Custom titlebar handlers
ipcMain.handle('window:close', () => {
  if (mainWindow) {
    mainWindow.hide();
  }
});

ipcMain.handle('window:quit', () => {
  // Set quitting flag to prevent window close event from hiding the window
  app.isQuiting = true;
  
  // Clean up widget window first
  if (widgetWindow && !widgetWindow.isDestroyed()) {
    try {
      widgetWindow.close();
      widgetWindow = null;
    } catch (error) {
      console.error('Error closing widget window during quit:', error);
    }
  }
  
  // Clean up tray
  if (tray) {
    tray.destroy();
    tray = null;
  }
  
  // Unregister all shortcuts
  globalShortcut.unregisterAll();
  
  // Quit the app
  app.quit();
});

ipcMain.handle('window:minimize', () => {
  if (mainWindow) {
    mainWindow.minimize();
  }
});

ipcMain.handle('window:maximize', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});

// Widget window handlers
ipcMain.handle('widget:close', () => {
  try {
    if (widgetWindow && !widgetWindow.isDestroyed()) {
      widgetWindow.close();
      return true;
    } else {
      console.log('Widget window is not available or already destroyed');
      return false;
    }
  } catch (error) {
    console.error('Error closing widget window:', error);
    return false;
  }
});

ipcMain.handle('widget:minimize', () => {
  try {
    if (widgetWindow && !widgetWindow.isDestroyed()) {
      widgetWindow.minimize();
      return true;
    } else {
      console.log('Widget window is not available or already destroyed');
      return false;
    }
  } catch (error) {
    console.error('Error minimizing widget window:', error);
    return false;
  }
});

ipcMain.handle('widget:maximize', () => {
  try {
    if (widgetWindow && !widgetWindow.isDestroyed()) {
      if (widgetWindow.isMaximized()) {
        widgetWindow.unmaximize();
      } else {
        widgetWindow.maximize();
      }
      return true;
    } else {
      console.log('Widget window is not available or already destroyed');
      return false;
    }
  } catch (error) {
    console.error('Error maximizing widget window:', error);
    return false;
  }
});

ipcMain.handle('widget:show', () => {
  try {
    if (widgetWindow && !widgetWindow.isDestroyed()) {
      widgetWindow.show();
      return true;
    } else {
      console.log('Widget window is not available or already destroyed, creating new one');
      createWidgetWindow();
      return true;
    }
  } catch (error) {
    console.error('Error showing widget window:', error);
    return false;
  }
});

ipcMain.handle('widget:hide', () => {
  try {
    if (widgetWindow && !widgetWindow.isDestroyed()) {
      widgetWindow.hide();
      return true;
    } else {
      console.log('Widget window is not available or already destroyed');
      return false;
    }
  } catch (error) {
    console.error('Error hiding widget window:', error);
    return false;
  }
});

ipcMain.handle('widget:setIgnoreMouseEvents', async (event, ignore, options) => {
  try {
    if (widgetWindow && !widgetWindow.isDestroyed()) {
      // Handle the options parameter safely
      if (ignore) {
        // When enabling click-through, use forward: true
        widgetWindow.setIgnoreMouseEvents(true, { forward: true });
      } else {
        // When disabling click-through, just pass false
        widgetWindow.setIgnoreMouseEvents(false);
      }
      return true;
    } else {
      console.log('Widget window is not available or already destroyed');
      return false;
    }
  } catch (error) {
    console.error('Error setting ignore mouse events:', error);
    return false;
  }
});

// Setup window handlers
ipcMain.handle('setup:continue', () => {
  console.log('Setup continue button pressed');
  // First create the main and widget windows
  console.log('Creating main and widget windows...');
  createMainAndWidgetWindows();

  // Then destroy the setup window
  if (setupWindow && !setupWindow.isDestroyed()) {
    console.log('Destroying setup window...');
    app.isQuiting = false; // Ensure we don't trigger app quit
    setupWindow.destroy(); // Use destroy() instead of close() to prevent the close event handler
    setupWindow = null;
  }
});

// Widget undetectability handlers
ipcMain.handle('widget:toggleUndetectability', () => {
  if (widgetWindow) {
    const newState = widgetWindow.toggleUndetectability();
    widgetUndetectabilityEnabled = newState;
    return newState;
  }
  return false;
});

ipcMain.handle('widget:setContentProtection', (event, enabled) => {
  if (widgetWindow) {
    widgetWindow.setContentProtection(enabled);
    return true;
  }
  return false;
});

ipcMain.handle('widget:getUndetectabilityState', () => {
  return widgetUndetectabilityEnabled;
});

// Click-through control handlers for main window
ipcMain.handle('window:setClickThrough', (event, clickThrough) => {
  if (mainWindow) {
    mainWindow.setIgnoreMouseEvents(clickThrough, { forward: true });
  }
});

ipcMain.handle('window:enableInteraction', () => {
  if (mainWindow) {
    mainWindow.setIgnoreMouseEvents(false);
  }
});

ipcMain.handle('window:disableInteraction', () => {
  if (mainWindow) {
    mainWindow.setIgnoreMouseEvents(true, { forward: true });
  }
});

// WSL Setup APIs
ipcMain.handle('installWSL', async () => {
  try {
    await ConfigSetupWslBeforeRestart();
    return { success: true };
  } catch (error) {
    console.error('Error installing WSL:', error);
    throw error;
  }
});

// Check if WSL is installed
ipcMain.handle('checkWSL', async () => {
  try {
    const status = await GetWslSTATUS();
    const statusOutput = status.toString().replace(/\x00/g, '').trim();
    
    // Check if WSL is properly installed (no error messages)
    const enableVMPStatement = `Please enable the "Virtual Machine Platform" optional component and ensure virtualization is enabled in the BIOS.`;
    const commandToEnableStatement = `Enable "Virtual Machine Platform" by running: wsl.exe --install --no-distribution For information please visit https://aka.ms/enablevirtualization`;
    
    if (statusOutput.includes(enableVMPStatement) || statusOutput.includes(commandToEnableStatement)) {
      return false; // WSL needs installation
    }
    
    // Check if status contains error indicators
    if (statusOutput.toLowerCase().includes('error') || statusOutput.toLowerCase().includes('not found')) {
      return false;
    }
    
    return true; // WSL is installed
  } catch (error) {
    console.error('Error checking WSL:', error);
    return false;
  }
});

// Global flag to prevent concurrent WSL configuration
let wslConfigurationInProgress = false;

ipcMain.handle('checkWslConfigDone', async () => {
  if (wslConfigurationInProgress) {
    console.log('WSL configuration already in progress, returning...');
    return false;
  }
  
  wslConfigurationInProgress = true;
  try {
    console.log('Starting WSL configuration process...');
    const result = await checkAndConfigureWslDistro('Ubuntu-22.04');
    console.log('WSL configuration process completed with result:', result);
    return result;
  } catch (error) {
    console.error('Error checking/configuring WSL distro:', error);
    return false;
  } finally {
    wslConfigurationInProgress = false;
  }
});

ipcMain.handle('restartSystem', async () => {
  try {
    exec('shutdown /r /t 0');
    return { success: true };
  } catch (error) {
    console.error('Error restarting system:', error);
    throw error;
  }
});

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






// Utility Functions Section !!! -------------------------------------------------------------------------------------

async function spawnPowerShellCommand(command , needOutput = false){
  return new Promise((resolve, reject) => {
      const process = spawn('powershell.exe', [command]);

      let stdout = '';
      process.stdout.on('data', (data) => {
          stdout += data.toString();
      });

      let stderr = '';
      process.stderr.on('data', (data) => {
          stderr += data.toString();
      });

      process.on('close', (code) => {
        if(code === 0){
          if (needOutput) resolve(stdout);
          else resolve();
        }
        else{
          resolve()
        }
        // else{
        //   reject(new Error(`Command failed with code ${code}: ${stderr}`));
        // }
      });
  });
}

async function executeCMDCommand(command, needOutput = false) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.log(`Exec error: ${error}`);
        reject(error);
      } else {
        if (stdout) console.log(`Stdout: ${stdout}`);
        if (stderr) console.log(`Stderr: ${stderr}`);

        if (needOutput) resolve(stdout);
        else resolve();
      }
    });
  });
}

async function loadStore() {
  const Store = (await import('electron-store')).default;
  const store = new Store();
  return store;
}

async function waitForDockerPing() {
  return new Promise(async (resolve, reject) => {
    // const pingInterval = setInterval(async () => {
    //   try {
    //     await docker.ping();
    //     console.log("Engine is Running !!!");
    //     resolve();
    //     clearInterval(pingInterval);
    //   } catch (error) {
    //     console.log("Docker Engine Not Ready Yet");
    //   }
    // }, 5000);


  });
}

// Utility Functions Section END !!! --------------------------------------------------------------------------------

// Tray Functions Section !!! -------------------------------------------------------------------------------------

function createTray() {
  // Create tray icon
  tray = new Tray(icon);
  
  // Create tray menu
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show DonnaAI',
      click: () => {
        if (mainWindow) {
          mainWindow.show();
          mainWindow.focus();
        }
      }
    },
    {
      label: 'Hide DonnaAI',
      click: () => {
        if (mainWindow) {
          mainWindow.hide();
        }
      }
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => {
        // Set quitting flag to prevent window close event from hiding the window
        app.isQuiting = true;
        
        // Clean up widget window first
        if (widgetWindow && !widgetWindow.isDestroyed()) {
          try {
            widgetWindow.close();
            widgetWindow = null;
          } catch (error) {
            console.error('Error closing widget window during quit:', error);
          }
        }
        
        // Clean up tray
        if (tray) {
          tray.destroy();
          tray = null;
        }
        
        // Unregister all shortcuts
        globalShortcut.unregisterAll();
        
        // Quit the app
        app.quit();
      }
    }
  ]);
  
  // Set tray tooltip
  tray.setToolTip('DonnaAI Desktop App');
  
  // Set tray menu
  tray.setContextMenu(contextMenu);
  
  // Handle tray icon click to show window (don't hide if already visible)
  tray.on('click', () => {
    if (mainWindow) {
      if (mainWindow.isVisible()) {
        // Window is already visible, just focus it
        mainWindow.focus();
      } else {
        // Window is hidden, show it and focus
        mainWindow.show();
        mainWindow.focus();
      }
    }
  });
}

// Tray Functions Section END !!! ----------------------------------------------------------------------------------
















// Config WSL Section !!! ------------------------------------------------------------------------------------------------------------------------------




/** Returns the Current State Of Wsl Helping to Decide What Step of Configuration is Wsl Currently present at */
/** 3 States [RestartSystem, InstallDistro,  ConfigureDistro, Good] */
function GetWslState(){
  return new Promise(async (resolve, reject) => {
    needsSystemRestart = await CheckWslNeedsRestart();
    if(needsSystemRestart){
        resolve("RestartSystem");
        return;
    }

    distroInstalled = await checkDistroPresent('Ubuntu');
    if(!distroInstalled){
        resolve("InstallDistro");
        return;
    }

    wslConfigCompleted = await checkWslConfigDone('Ubuntu');
    if(!wslConfigCompleted){
        resolve("ConfigureDistro");
        return;
    }

    resolve("Good");
    return;
  });
}

/** Gets The Current Wsl Status */
function GetWslSTATUS(){
  return new Promise((resolve, reject) => {
      spawnPowerShellCommand('wsl.exe --status' , true).then((output) => {
          resolve(output);
      });
  });
}

/** Checks If Wsl needs Restart Because of the current Wsl Status */
function CheckWslNeedsRestart(){
  return new Promise((resolve, reject) => {
      GetWslSTATUS().then(async (status) => {
          statusOutput = status.toString().replace(/\x00/g, '').trim();

          EnableVMPComponentStatement = `Please enable the "Virtual Machine Platform" optional component and ensure virtualization is enabled in the BIOS.`;
          CommandToEnableComponentStatement = `Enable "Virtual Machine Platform" by running: wsl.exe --install --no-distribution For information please visit https://aka.ms/enablevirtualization`

          if(statusOutput.includes(EnableVMPComponentStatement) || statusOutput.includes(CommandToEnableComponentStatement)){
              resolve(true);
              return;
          }

          resolve(false);
          return;
      });
  });
}

/** Checks if a specific Distro is present Inside Wsl or not */
function checkDistroPresent(distroName){

  return new Promise((resolve, reject) => {
      exec('wsl --list --quiet', (error, stdout, stderr) => {

          if (error) {
              console.error(`Error checking for distros: ${error.message}`);
              resolve(false);
              return;
          }

          if (stderr) {
              console.error(`Standard error: ${stderr}`);
              resolve(false);
              return;
          }

          if (stdout) {
              const output = stdout.toString().replace(/\x00/g, '').trim();
              if(output.split('\n').map(line => line.replace(/\r$/, '')).includes(distroName)) {
                  console.log("Distro Found");
                  resolve(true);
                  return;
              }
              else{
                  resolve(false);
                  return;
              }         
          } 

          if (stdout == '') {
              resolve(false);
              return;
          }
      });

  })
}

// !!!! Need to be Updated
/** Check if All the Configurations Needed to Run Containers Inside a Distro Is Completed or Not, Return -> Boolean */
function checkWslConfigDone(distroName){
  return new Promise(async (resolve, reject) => {
      try {
          // First check if distro exists
          const distroExists = await checkDistroPresent(distroName);
          if (!distroExists) {
              console.log('Distro does not exist');
              resolve(false);
              return;
          }

          // Check if Docker is installed
          const dockerInstalled = await checkDockerInstalled(distroName);
          if (!dockerInstalled) {
              console.log('Docker is not installed');
              resolve(false);
              return;
          }

          // Check if Docker service is running
          const dockerRunning = await checkDockerServiceRunning(distroName);
          if (!dockerRunning) {
              console.log('Docker service is not running');
              resolve(false);
              return;
          }

          // Check if Docker is configured to listen on TCP port 2375
          const dockerConfigured = await checkDockerTCPConfig(distroName);
          if (!dockerConfigured) {
              console.log('Docker TCP configuration is not set up');
              resolve(false);
              return;
          }

          console.log('All WSL configurations are complete');
          resolve(true);
      } catch (error) {
          console.error('Error checking WSL config:', error);
          resolve(false);
      }
  });
}

/** Check if Docker is installed in the distro */
function checkDockerInstalled(distroName) {
  return new Promise((resolve, reject) => {
      const command = `wsl -d ${distroName} --exec bash -c "which docker"`;
      exec(command, (error, stdout, stderr) => {
          if (error || stderr) {
              console.log('Docker is not installed');
              resolve(false);
              return;
          }
          if (stdout && stdout.trim()) {
              console.log('Docker is installed');
              resolve(true);
              return;
          }
          resolve(false);
      });
  });
}

/** Check if Docker service is running in the distro */
function checkDockerServiceRunning(distroName) {
  return new Promise((resolve, reject) => {
      const command = `wsl -d ${distroName} --exec bash -c "systemctl is-active --quiet docker"`;
      exec(command, (error, stdout, stderr) => {
          if (error) {
              console.log('Docker service is not running');
              resolve(false);
              return;
          }
          console.log('Docker service is running');
          resolve(true);
      });
  });
}

/** Check if Docker is configured to listen on TCP port 2375 */
function checkDockerTCPConfig(distroName) {
  return new Promise((resolve, reject) => {
    // First check if the systemd configuration file exists and has correct content
    const configCheck = `wsl -d ${distroName} --exec bash -c "test -f /etc/systemd/system/docker.service.d/setup.conf && grep -q 'tcp://127.0.0.1:2375' /etc/systemd/system/docker.service.d/setup.conf"`;
    exec(configCheck, (configError, configStdout, configStderr) => {
      if (configError) {
        console.log('Docker TCP configuration file not found or has incorrect content');
        resolve(false);
        return;
      }
      
      // Then test the actual connection using curl
      const curlCheck = `wsl -d ${distroName} --exec bash -c "curl -s http://127.0.0.1:2375/version"`;
      exec(curlCheck, (curlError, curlStdout, curlStderr) => {
        if (curlError || !curlStdout || !curlStdout.trim()) {
          console.log('Docker TCP configuration file exists but connection test failed');
          resolve(false);
          return;
        }
        
        // Check if the response contains Docker version info
        if (curlStdout.includes('Version') || curlStdout.includes('ApiVersion')) {
          console.log('Docker TCP configuration is set up and responding correctly');
          resolve(true);
        } else {
          console.log('Docker TCP configuration file exists but response is not valid Docker API');
          resolve(false);
        }
      });
    });
  });
}

/** Check if user exists in the distro */
function checkUserExists(distroName, username) {
  return new Promise((resolve, reject) => {
    const command = `wsl -d ${distroName} --exec bash -c "id -u ${username}"`;
    exec(command, (error, stdout, stderr) => {
      if (error || stderr) {
        console.log(`User ${username} does not exist in distro`);
        resolve(false);
        return;
      }
      console.log(`User ${username} exists in distro`);
      resolve(true);
    });
  });
}

/** Complete distro configuration - checks everything and configures if needed */
async function ConfigDistro(distroName) {
  console.log('Starting complete distro configuration check and setup...');
  
  try {
    // 1. Check if distro exists
    const distroExists = await checkDistroPresent(distroName);
    if (!distroExists) {
      console.log('Distro does not exist, installing...');
      await InstallWslDistroandConfigUser('donna', 'harvey', distroName);
      console.log('Distro installation completed');
    } else {
      console.log('Distro exists, checking configuration...');
    }

    // 2. Check if Docker is installed and configured
    const dockerInstalled = await checkDockerInstalled(distroName);
    const dockerRunning = await checkDockerServiceRunning(distroName);
    const dockerConfigured = await checkDockerTCPConfig(distroName);
    
    if (!dockerInstalled || !dockerRunning || !dockerConfigured) {
      console.log('Docker setup incomplete, running setup script...');
      await runSetupScript(distroName);
      console.log('Setup script completed');
    } else {
      console.log('Docker is already properly configured');
    }

    console.log('All distro configurations are complete!');
    return true;
    
  } catch (error) {
    console.error('Error in ConfigDistro:', error);
    return false;
  }
}

/** Intelligent WSL distro check and configuration - only performs missing steps */
async function checkAndConfigureWslDistro(distroName) {
  console.log('Starting intelligent WSL distro check and configuration...');
  
  try {
    // 1. Check if distro exists
    const distroExists = await checkDistroPresent(distroName);
    if (!distroExists) {
      console.log('Distro does not exist, installing from scratch...');
      await InstallWslDistroandConfigUser('donna', 'harvey', distroName);
      console.log('Distro installation completed');
      return true;
    }
    
    console.log('Distro exists, checking user and Docker configuration step by step...');
    
    // 2. Check if required user exists
    const userExists = await checkUserExists(distroName, 'donna');
    if (!userExists) {
      console.log('Required user does not exist, creating user...');
      // Note: This would need a separate function to create just the user
      // For now, we'll run the full setup script which includes user creation
      console.log('Running setup script to create user and configure Docker...');
      try {
        await runSetupScript(distroName);
        console.log('Setup script completed successfully');
        return true;
      } catch (error) {
        console.error('Setup script failed for user creation:', error);
        return false;
      }
    }
    
    console.log('User exists, checking Docker configuration...');
    
    // 3. Check Docker installation
    const dockerInstalled = await checkDockerInstalled(distroName);
    if (!dockerInstalled) {
      console.log('Docker not installed, installing Docker...');
      await installDockerInDistro(distroName);
      console.log('Docker installation completed');
    } else {
      console.log('Docker is already installed');
    }
    
    // 4. Check Docker service status
    const dockerRunning = await checkDockerServiceRunning(distroName);
    if (!dockerRunning) {
      console.log('Docker service not running, starting Docker service...');
      await startDockerService(distroName);
      console.log('Docker service started');
    } else {
      console.log('Docker service is already running');
    }
    
    // 5. Check Docker TCP configuration
    const dockerConfigured = await checkDockerTCPConfig(distroName);
    if (!dockerConfigured) {
      console.log('Docker TCP configuration missing, configuring Docker...');
      await configureDockerTCP(distroName);
      console.log('Docker TCP configuration completed');
    } else {
      console.log('Docker TCP configuration is already set up');
    }
    
    // 6. Final verification
    const finalDockerInstalled = await checkDockerInstalled(distroName);
    const finalDockerRunning = await checkDockerServiceRunning(distroName);
    const finalDockerConfigured = await checkDockerTCPConfig(distroName);
    
    if (finalDockerInstalled && finalDockerRunning && finalDockerConfigured) {
      console.log('All WSL and Docker configurations are complete!');
      return true;
    } else {
      console.log('Some configurations are still incomplete, running full setup script as fallback...');
      try {
        await runSetupScript(distroName);
        console.log('Full setup script completed successfully');
        
        // Final validation after fallback script
        const postScriptDockerInstalled = await checkDockerInstalled(distroName);
        const postScriptDockerRunning = await checkDockerServiceRunning(distroName);
        const postScriptDockerConfigured = await checkDockerTCPConfig(distroName);
        
        if (postScriptDockerInstalled && postScriptDockerRunning && postScriptDockerConfigured) {
          console.log('Fallback setup script validation successful');
          return true;
        } else {
          console.error('Fallback setup script validation failed');
          console.error(`Docker installed: ${postScriptDockerInstalled}, running: ${postScriptDockerRunning}, configured: ${postScriptDockerConfigured}`);
          return false;
        }
      } catch (error) {
        console.error('Fallback setup script failed:', error);
        return false;
      }
    }
    
  } catch (error) {
    console.error('Error in checkAndConfigureWslDistro:', error);
    return false;
  }
}

/** Install Docker in the distro */
function installDockerInDistro(distroName) {
  return new Promise((resolve, reject) => {
    const commands = [
      'apt update',
      'apt install -y apt-transport-https ca-certificates curl software-properties-common gnupg lsb-release',
      'curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg',
      'echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null',
      'apt update',
      'apt install -y docker-ce docker-ce-cli containerd.io'
    ];

    let currentCommand = 0;
    
    function executeNextCommand() {
      if (currentCommand >= commands.length) {
        resolve();
        return;
      }
      
      const command = commands[currentCommand];
      console.log(`Executing: ${command}`);
      
      exec(`wsl -d ${distroName} --exec bash -c "${command}"`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing command: ${command}`, error);
          // Continue with next command even if this one fails
        }
        currentCommand++;
        executeNextCommand();
      });
    }
    
    executeNextCommand();
  });
}

/** Start Docker service in the distro */
function startDockerService(distroName) {
  return new Promise((resolve, reject) => {
    const commands = [
      'systemctl enable docker',
      'systemctl start docker',
      'systemctl status docker'
    ];

    let currentCommand = 0;
    
    function executeNextCommand() {
      if (currentCommand >= commands.length) {
        resolve();
        return;
      }
      
      const command = commands[currentCommand];
      console.log(`Executing: ${command}`);
      
      exec(`wsl -d ${distroName} --exec bash -c "${command}"`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing command: ${command}`, error);
          // Continue with next command even if this one fails
        }
        currentCommand++;
        executeNextCommand();
      });
    }
    
    executeNextCommand();
  });
}

/** Run the setup script in the distro */
function runSetupScript(distroName) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('Copying setup script to distro...');
      
      // 1. Create setup directory as donna user
      await executeWslCommand('mkdir -p ~/wslSetupScript', distroName, 'donna');
      
      // 2. Copy setup script from host to distro
      const copyCommand = `cp ./setup.sh ~/wslSetupScript/dockerSetup.sh`;
      await executeWslCommand(copyCommand, distroName, 'donna');
      
      // 3. Make script executable
      await executeWslCommand('chmod +x ~/wslSetupScript/dockerSetup.sh', distroName, 'donna');
      
      // 4. Execute the setup script with sudo privileges as donna user
      console.log('Executing setup script with sudo as donna user...');
      await executeWslCommand('echo harvey | sudo -S ~/wslSetupScript/dockerSetup.sh', distroName, 'donna');
      
      // 5. Validate that the setup was successful
      console.log('Validating setup completion...');
      const dockerInstalled = await checkDockerInstalled(distroName);
      const dockerRunning = await checkDockerServiceRunning(distroName);
      const dockerConfigured = await checkDockerTCPConfig(distroName);
      
      if (dockerInstalled && dockerRunning && dockerConfigured) {
        console.log('Setup script executed and validated successfully');
        resolve(true);
      } else {
        console.error('Setup script completed but validation failed');
        console.error(`Docker installed: ${dockerInstalled}, running: ${dockerRunning}, configured: ${dockerConfigured}`);
        reject(new Error('Setup script validation failed'));
      }
      
    } catch (error) {
      console.error('Error running setup script:', error);
      reject(error);
    }
  });
}

/** Configure Docker to listen on TCP port 2375 */
function configureDockerTCP(distroName) {
  return new Promise((resolve, reject) => {
    const commands = [
      'mkdir -p /etc/systemd/system/docker.service.d',
      'tee /etc/systemd/system/docker.service.d/setup.conf > /dev/null <<EOL\n[Service]\nExecStart=\nExecStart=/usr/bin/dockerd -H fd:// -H tcp://127.0.0.1:2375\nEOL',
      'systemctl daemon-reexec',
      'systemctl daemon-reload',
      'systemctl restart docker'
    ];

    let currentCommand = 0;
    
    function executeNextCommand() {
      if (currentCommand >= commands.length) {
        resolve();
        return;
      }
      
      const command = commands[currentCommand];
      console.log(`Executing: ${command}`);
      
      exec(`wsl -d ${distroName} --exec bash -c "${command}"`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing command: ${command}`, error);
          // Continue with next command even if this one fails
        }
        currentCommand++;
        executeNextCommand();
      });
    }
    
    executeNextCommand();
  });
}

/** Handled the Actions to take based on the Wsl State */
function handleWslStateActions(state){
  console.log("Current Wsl State : " , state);
  if(state == "RestartSystem"){
      console.log("Need to Restart System");
      ConfigSetupWslBeforeRestart().then(() => {
          console.log("Pre-requisites Done");
          mainWindow.webContents.send('navigate-to-component' , '/LoginPage/RestartWidget');
      });
  }
  else if(state == "ConfigureDistro" || state == "InstallDistro"){
      console.log("Need to Install or Configure Distro");
      mainWindow.webContents.send('navigate-to-component' , '/LoginPage/ConfigLoadingWidget');
  }
  else{
    storeStoreData('isWslSetupDone' , true);
    mainWindow.webContents.send('navigate-to-component' , '/MainPage');
  }
}

/** Completes the Configuration for Wsl Before Restart */
function ConfigSetupWslBeforeRestart(){
  return new Promise(async (resolve, reject) => {
      console.log("Starting Pre-requisites")

      const VMPComponentActivateCommand = "dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart"
      try {await spawnPowerShellCommand(VMPComponentActivateCommand);} catch(error) {}
      console.log("VMP Activated")

      const WslInstallCommand = `wsl.exe --install --no-distribution`;
      await spawnPowerShellCommand(WslInstallCommand);
      console.log("Wsl No Distro Installed")

      const KernelUpdateCommand = `wsl.exe --update`;
      await spawnPowerShellCommand(KernelUpdateCommand);
      resolve();
  });
}

/** Configures the Complete Wsl Distro to run Containers By a specific User*/
async function ConfigWslFromScratch(username, password , distroName){
  console.log("configuring Wsl from Scratch")
  try {await MakeWslSetupDirectory(username , distroName);} catch(error){}
  console.log("Directory Work Done")
  await CopyShScriptToWsl(username , distroName);
  await ExecuteWslConfigShScript(username , password , distroName);
}

/** Installing the Complete Wsl Distro from Scratch and Configuring the Envrionment for that Distro */
function InstallWslDistroandConfigUser(username , password , distroName){
  return new Promise((resolve, reject) => {
    // console.log("Starting Wsl Installation and Config")
    const controller = new AbortController();
    const signal = controller.signal;

    InstallDistroWSL(signal , distroName);

    const EventDistroInstalled = new Promise(async (resolve, reject) => {
        while(true){
            // console.log("Checking for Distro Installation");
            const isPresent = await checkDistroPresent(distroName);
            console.log(isPresent);

            if(isPresent){
                console.log("Distro Found");
                setTimeout(() => {
                  controller.abort();
                  resolve();
                }, 10000);
                break;
            }
            
            await new Promise((resolve , reject) => {
                setTimeout(() => {
                    resolve();
                }, 5000);
            });

        }
    });

    EventDistroInstalled
    .then(() =>{
        console.log("Distro Installed Can Move forward to User Adding");
        AddNewUserInDistro(username , password , distroName , true)
        .then(async () => {
            console.log("User Added");

            await ConfigWslFromScratch(username , password , distroName);

            resolve();
        });
    });


  });

}


// !!!! Need to be Updated
/** Install a Distro In Wsl */  // 
function InstallDistroWSL(signal , distroName){
  return new Promise((resolve, reject) => {
      console.log(`Installing the Desired Distro: ${distroName}`);
      const InstallDistroProcess = spawn('wsl', ['--install', '-d', distroName]);

      InstallDistroProcess.on('close', () => {
          console.log(`Process of Installing the Desired Distro has Completed`);
          resolve();
          return;
      });


      signal.addEventListener('abort', () => {
          console.log("Abort Signal Received");
          InstallDistroProcess.kill('SIGKILL');
          resolve();
          return;
      });

  });
}

/** Setting Up a new User Inside a Distro alongiside with its password */
function AddNewUserInDistro(username , password , distroName , sudoAccess){
  return new Promise(async (resolve, reject) => {
      await AddUserToDistro(username , distroName , sudoAccess);
      await ChangeUserPasswordInDistro(username , password , distroName);
      resolve();
  });
}

/** Adds a User To Distro Without Setting Password */
function AddUserToDistro(username , distroName , sudoAccess){
  return new Promise((resolve, reject) => {

      let AddUserCommand = `wsl -d ${distroName} --exec bash -c "useradd -m -s /bin/bash ${username}"`;
      if(sudoAccess)
          AddUserCommand = `wsl -d ${distroName} --exec bash -c "useradd -m -s /bin/bash -G sudo ${username}"`;


      console.log(AddUserCommand)
      const AddUserProcess = spawn('powershell.exe', [AddUserCommand]);

      AddUserProcess.stderr.on('data', (data) => {
          console.error(`stderr: ${data}`);
      });

      AddUserProcess.on('close', () => {
          resolve();
      });

      AddUserProcess.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
      });

  });
}

/** Changes the password for a specific User in a specific Distro */
function ChangeUserPasswordInDistro(username , password , distroName){
  return new Promise((resolve, reject) => {
      const ChangePasswordCommand = `echo ${username}:${password} | chpasswd`;
      console.log(ChangePasswordCommand)

      const ChangePasswordProcess = spawn('wsl', ['-d', distroName, '--exec', 'bash', '-c', ChangePasswordCommand]);

      ChangePasswordProcess.stderr.on('data', (data) => {
          console.error(`stderr: ${data}`);
      });

      ChangePasswordProcess.on('close', () => {
          console.log("Password Changed");
          resolve();
      });
  });
}

// !!!! Need to be Updated
/** Set-ups Directory For a Particular User Inside particular Distro Used To Store Sh Scripts Needed to Setup Environment */
function MakeWslSetupDirectory(username ,  distroName){
  return new Promise((resolve, reject) => {
    commandToExecute = "mkdir ~/wslSetupScript"
    logger.info('Main Js: Making Directory for Storing Wsl Setup Script')
    executeWslCommand(commandToExecute , distroName , username).then(() => {
        logger.info('Main Js: Directory Made for Storing Wsl Setup Script')
        resolve();
    });
  })
}

// !!!! Need to be Updated
/** Copying Sh Script From Host machine OS to Wsl for a particular user inside a particular Distro*/
function CopyShScriptToWsl(username , distroName){
  return new Promise(async (resolve, reject) => {
    try {
      const makingDirectoryCommand = `mkdir -p ~/wslSetupScript`
      console.log("Making Directory for Storing Wsl Setup Script")
      await executeWslCommand(makingDirectoryCommand , distroName , username);
      console.log("Directory Made for Storing Wsl Setup Script")

      const commandToExecute = `cp ./setup.sh ~/wslSetupScript/dockerSetup.sh`
      console.log('Main Js: Copying Sh Script to Wsl')
      await executeWslCommand(commandToExecute , distroName , username);
      console.log('Main Js: Sh Script Copied to Wsl')
      resolve();
    } catch (error) {
      console.error('Error copying script to WSL:', error);
      reject(error);
    }
  })
}

// !!!! Need to be Updated
/** Executing the Sh Files Inside a Distro for a particular User */
function ExecuteWslConfigShScript(username , password , distroName){
  return new Promise((resolve, reject) => {
    console.log("Running the Script to Configure WSL Distro")
    const commandToExecute = `cd /home/${username}/wslSetupScript  && echo ${password} | sudo -S bash setup.sh`
    console.log(password);
    // executeWslCommand(commandToExecute , distroName , username).then(() => {
    //     console.log("Script Executed !!!")
    //     resolve();
    // });
    console.log('Main Js: Executing the Sh Script to Configure WSL Distro')
    const ExecuteCMD = `wsl -d ${distroName} -u ${username} --exec bash -c "cd /home/${username}/wslSetupScript  && echo ${password} | sudo -S bash dockerSetup.sh"`
    spawnPowerShellCommand(ExecuteCMD).then(() => {
        console.log('Main Js: Script Executed and configuration Completed')
        resolve();
    });
  })
}


/** Executes a Command Inside a particular WSL Distro with a particular user */
function executeWslCommand(command , distroName , username = "root" , needOutput = false){
  return new Promise((resolve, reject) => {
      const ExecuteCMD = `wsl -d ${distroName} -u ${username} --exec bash -c "${command}"`
      const process = spawn('powershell.exe', [ExecuteCMD]);

      let stdout = '';
      process.stdout.on('data', (data) => {
          stdout += data.toString();
      });

      let stderr = '';
      process.stderr.on('data', (data) => {
        // console.log("Error : " , data.toString());
          stderr += data.toString();
      });

      process.on('close', (code) => {
        if(code === 0){
          if (needOutput) resolve(stdout);
          else resolve();
        }
        else{
          console.log("Error Exist In this Command");
          console.log("Error details:", stderr);
          reject(new Error(`Command failed with code ${code}: ${stderr}`));
        }
      });
  });
}






// Config WSL Section END !!! ----------------------------------------------------------------------------------------------------------------














// App Event Trigger Section !!! --------------------------------------------------------------------------------



async function handleEvent(eventInfo) {
  console.log("Event Triggered")
  // console.log(eventInfo);
  console.log(eventInfo["AGENT_ID"])

  if (eventInfo["EVENT"] == "INSTALL_AGENT") {
    mainWindow.webContents.send('install-agent', agentId = eventInfo["AGENT_ID"], agentVersion = eventInfo["AGENT_VERSION"])
  }
  else if (eventInfo["EVENT"] == "UI_AUTOMATE") {
    uiAutomateHandler(eventInfo["DATA"]);
  }

}

async function handleWebEventTrigger(url) {
  console.log("Event Triggered")
  console.log(url);
  let eventInfo = url.replace(/^agentbed:\/\//i, '');

  if (eventInfo.endsWith('/')) {
    eventInfo = eventInfo.slice(0, -1);
  }

  try {
    const decoded = decodeURIComponent(eventInfo);
    const parsed = JSON.parse(decoded);
    console.log('Received AgentBed event:', parsed);
    await handleEvent(parsed);
  } catch (e) {
    console.log('Failed to parse AgentBed event:', eventInfo, e);
  }

}


// App Event Trigger Section END !!! ---------------------------------------------------------------------------




// App Section !!! -------------------------------------------------------------------------------------

app.on('second-instance', (event, argv) => {
  const urlArg = argv.find(arg => arg.startsWith('agentbed://'));
  if (urlArg) {
    console.log('Second instance with protocol:', urlArg);
    if (mainWindow) {
      handleWebEventTrigger(urlArg);
    }
  }
});

app.whenReady().then(async () => {

  // Initialize quitting flag
  app.isQuiting = false;

  // Single Instance Check 
  const AppLock = app.requestSingleInstanceLock();
  if (!AppLock) {app.exit(0);}

  // Global Shortcuts
  globalShortcut.register('CommandOrControl+R', () => {
    console.log('Ctrl+R is disabled');
  });

  globalShortcut.register('F5', () => {
    console.log('F5 is disabled');
  });-

  // Widget toggle shortcut (Ctrl + `)
  globalShortcut.register('CommandOrControl+`', () => {
    console.log('Widget toggle shortcut pressed');
    if (widgetWindow && !widgetWindow.isDestroyed()) {
      if (widgetWindow.isVisible()) {
        widgetWindow.hide();
        console.log('Widget hidden');
      } else {
        widgetWindow.show();
        setTimeout(() => {
          if (widgetWindow && !widgetWindow.isDestroyed()) {
            widgetWindow.setIgnoreMouseEvents(true, { forward: true });
            widgetWindow.window.setAlwaysOnTop(false); // Reset first
            widgetWindow.window.setAlwaysOnTop(true, 'screen-saver'); // Re-apply
            widgetWindow.focus(); // Ensure focus
          }
        }, 100);
        console.log('Widget shown');
      }
    } else {
      // If widget window doesn't exist, create it
      createWidgetWindow();
    }
  });

  // Initialize DB 
  try{ initDb()}
  catch (error) { console.error('Failed to initialize database:', error); }

  // Load Store
  store = await loadStore();

  // Auto Updater
    // autoUpdater.setFeedURL({
    //   provider: 'github',
    //   owner: 'Nicky9319',
    //   repo: 'UserApplication_UpdateRepo',
    //   private: false,
    // });  

    // autoUpdater.checkForUpdates();
  

  // Create setup window first
  createSetupWindow();

  // Register Protocol with the Windows
  // Note: Protocol handling will be set up after main window is created

});

app.on('will-quit' , async (event) => {
  event.preventDefault();
  console.log("Quitting The Application !!!");

  // Set quitting flag
  app.isQuiting = true;

  // Clean up tray
  if (tray) {
    tray.destroy();
    tray = null;
  }

  // Clean up setup window
  if (setupWindow && !setupWindow.isDestroyed()) {
    try {
      setupWindow.close();
      setupWindow = null;
    } catch (error) {
      console.error('Error closing setup window during quit:', error);
    }
  }

  // Clean up widget window
  if (widgetWindow && !widgetWindow.isDestroyed()) {
    try {
      widgetWindow.close();
      widgetWindow = null;
    } catch (error) {
      console.error('Error closing widget window during quit:', error);
    }
  }

  globalShortcut.unregisterAll();
  app.exit(0);
});


// App Section END !!! --------------------------------------------------------------------------------









// function createWindow() {
//   initDb()
//   .then(() => { 
//     console.log('Database initialized successfully');
//     addAgentInfo({ id: 1, name: 'Agent 1', env: {} })

//   });
  
//   // Create the browser window.
//   const mainWindow = new BrowserWindow({
//     width: 1440,
//     height: 1024,
//     show: false,
//     autoHideMenuBar: true,
//     ...(process.platform === 'linux' ? { icon } : {}),
//     webPreferences: {
//       preload: join(__dirname, '../preload/preload.js'),
//       sandbox: false
//     }
//   })

//   mainWindow.on('ready-to-show', () => {
//     mainWindow.show()
//   })

//   mainWindow.webContents.setWindowOpenHandler((details) => {
//     shell.openExternal(details.url)
//     return { action: 'deny' }
//   })

//   // HMR for renderer base on electron-vite cli.
//   // Load the remote URL for development or the local html file for production.
//   if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
//     mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
//   } else {
//     mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
//   }
// }

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

// app.whenReady().then(() => {
//   // Set app user model id for windows
//   electronApp.setAppUserModelId('com.electron')

//   // Default open or close DevTools by F12 in development
//   // and ignore CommandOrControl + R in production.
//   // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils


//   // app.on('browser-window-created', (_, window) => {
//   //   optimizer.watchWindowShortcuts(window)
//   // })

//   // IPC test
//   ipcMain.on('ping', () => console.log('pong'))

//   createWindow()

//   app.on('activate', function () {
//     // On macOS it's common to re-create a window in the app when the
//     // dock icon is clicked and there are no other windows open.
//     if (BrowserWindow.getAllWindows().length === 0) createWindow()
//   })
// })

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
