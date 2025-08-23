import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
const path = require('path')

import { initDb,
  getAgentsInfo,
  addAgentInfo,
  updateAgentEnvVariable} from './db/db.js';

  
// Import the db functions with direct relative path
let dbApi = {initDb, getAgentsInfo, addAgentInfo, updateAgentEnvVariable};



if (process.contextIsolated) {
  try{
    contextBridge.exposeInMainWorld('electron', electronAPI)

    contextBridge.exposeInMainWorld('db', {
      updateAgentEnvVariable: (agentId, envVariable) => dbApi.updateAgentEnvVariable ? dbApi.updateAgentEnvVariable(agentId, envVariable) : Promise.reject('db not loaded'),
      getAgentsInfo: () => dbApi.getAgentsInfo ? dbApi.getAgentsInfo() : Promise.reject('db not loaded'),
      addAgentInfo: (agent) => dbApi.addAgentInfo ? dbApi.addAgentInfo(agent) : Promise.reject('db not loaded'),
      initDb: () => dbApi.initDb ? dbApi.initDb() : Promise.reject('db not loaded'),
    });

    contextBridge.exposeInMainWorld('electronAPI', {
      closeApp: () => ipcRenderer.invoke('window:close'),
      quitApp: () => ipcRenderer.invoke('window:quit'),
      minimizeApp: () => ipcRenderer.invoke('window:minimize'),
      maximizeApp: () => ipcRenderer.invoke('window:maximize'),
      enableInteraction: () => ipcRenderer.invoke('window:enableInteraction'),
      disableInteraction: () => ipcRenderer.invoke('window:disableInteraction'),
      setIgnoreMouseEvents: (ignore) => ipcRenderer.invoke('widget:setIgnoreMouseEvents', ignore),
      setupContinue: () => ipcRenderer.invoke('setup:continue'),
    });

    contextBridge.exposeInMainWorld('widgetAPI', {
      closeWidget: () => ipcRenderer.invoke('widget:close'),
      minimizeWidget: () => ipcRenderer.invoke('widget:minimize'),
      maximizeWidget: () => ipcRenderer.invoke('widget:maximize'),
      showWidget: () => ipcRenderer.invoke('widget:show'),
      hideWidget: () => ipcRenderer.invoke('widget:hide'),
      recreateWidget: () => ipcRenderer.invoke('widget:recreate'),
      enableClickThrough: () => ipcRenderer.invoke('widget:setIgnoreMouseEvents', true, { forward: true }),
      disableClickThrough: () => ipcRenderer.invoke('widget:setIgnoreMouseEvents', false),
      // Undetectability controls
      toggleUndetectability: () => ipcRenderer.invoke('widget:toggleUndetectability'),
      setContentProtection: (enabled) => ipcRenderer.invoke('widget:setContentProtection', enabled),
      getUndetectabilityState: () => ipcRenderer.invoke('widget:getUndetectabilityState'),
    });

  }
  catch (error) {
    console.error(error)
  }
}
else{
  window.electron = electronAPI
  window.db = {
    updateAgentEnvVariable: (agentId, envVariable) => dbApi.updateAgentEnvVariable ? dbApi.updateAgentEnvVariable(agentId, envVariable) : Promise.reject('db not loaded'),
    getAgentsInfo: () => dbApi.getAgentsInfo ? dbApi.getAgentsInfo() : Promise.reject('db not loaded'),
    addAgentInfo: (agent) => dbApi.addAgentInfo ? dbApi.addAgentInfo(agent) : Promise.reject('db not loaded'),
    initDb: () => dbApi.initDb ? dbApi.initDb() : Promise.reject('db not loaded'),
  }
  window.electronAPI = {
    closeApp: () => ipcRenderer.invoke('window:close'),
    quitApp: () => ipcRenderer.invoke('window:quit'),
    minimizeApp: () => ipcRenderer.invoke('window:minimize'),
    maximizeApp: () => ipcRenderer.invoke('window:maximize'),
    enableInteraction: () => ipcRenderer.invoke('window:enableInteraction'),
    disableInteraction: () => ipcRenderer.invoke('window:disableInteraction'),
    setIgnoreMouseEvents: (ignore) => ipcRenderer.invoke('widget:setIgnoreMouseEvents', ignore),
    setupContinue: () => ipcRenderer.invoke('setup:continue'),
  }
  window.widgetAPI = {
    closeWidget: () => ipcRenderer.invoke('widget:close'),
    minimizeWidget: () => ipcRenderer.invoke('widget:minimize'),
    maximizeWidget: () => ipcRenderer.invoke('widget:maximize'),
    showWidget: () => ipcRenderer.invoke('widget:show'),
    hideWidget: () => ipcRenderer.invoke('widget:hide'),
    recreateWidget: () => ipcRenderer.invoke('widget:recreate'),
    enableClickThrough: () => ipcRenderer.invoke('widget:setIgnoreMouseEvents', true, { forward: true }),
    disableClickThrough: () => ipcRenderer.invoke('widget:setIgnoreMouseEvents', false),
    // Undetectability controls
    toggleUndetectability: () => ipcRenderer.invoke('widget:toggleUndetectability'),
    setContentProtection: (enabled) => ipcRenderer.invoke('widget:setContentProtection', enabled),
    getUndetectabilityState: () => ipcRenderer.invoke('widget:getUndetectabilityState'),
  }
}