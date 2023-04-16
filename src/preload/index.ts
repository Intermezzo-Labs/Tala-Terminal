import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import {
  Setting,
  InventoryItem,
  InventoryItemInput,
  InventoryCategoryInput,
  InventoryCategory
} from '../shared/models'

// Custom APIs for renderer
const api = {
  settings: {
    getSettings: (): Promise<Setting[]> => {
      return new Promise((resolve, reject) => {
        ipcRenderer.once('get-settings-response', (_event, settings) => {
          resolve(settings)
        })
        ipcRenderer.once('get-settings-error', (_event, error) => {
          reject(error)
        })
        ipcRenderer.send('get-settings')
      })
    },
    updateSetting: (key: string, value: string): Promise<Setting[]> => {
      return new Promise((resolve, reject) => {
        ipcRenderer.once('update-setting-response', (_event, setting) => {
          resolve(setting)
        })
        ipcRenderer.once('update-setting-error', (_event, error) => {
          reject(error)
        })
        ipcRenderer.send('update-setting', key, value)
      })
    }
  },
  inventory: {
    getInventoryItems: (): Promise<InventoryItem[]> => {
      return new Promise((resolve, reject) => {
        ipcRenderer.once('get-inventory-items-response', (_event, items) => {
          resolve(items)
        })
        ipcRenderer.once('get-inventory-items-error', (_event, error) => {
          reject(error)
        })
        ipcRenderer.send('get-inventory-items')
      })
    },
    createInventoryItem: (item: InventoryItemInput): Promise<InventoryItem> => {
      return new Promise((resolve, reject) => {
        ipcRenderer.once('create-inventory-item-response', (_event, createdItem) => {
          resolve(createdItem)
        })
        ipcRenderer.once('create-inventory-item-error', (_event, error) => {
          reject(error)
        })
        ipcRenderer.send('create-inventory-item', item)
      })
    },
    updateInventoryItem: (item: InventoryItem): Promise<InventoryItem | null> => {
      return new Promise((resolve, reject) => {
        ipcRenderer.once('update-inventory-item-response', (_event, updatedItem) => {
          resolve(updatedItem)
        })
        ipcRenderer.once('update-inventory-item-error', (_event, error) => {
          reject(error)
        })
        ipcRenderer.send('update-inventory-item', item)
      })
    },
    getInventoryCategories: (): Promise<InventoryCategory[]> => {
      return new Promise((resolve, reject) => {
        ipcRenderer.once('get-inventory-categories-response', (_event, items) => {
          resolve(items)
        })
        ipcRenderer.once('get-inventory-categories-error', (_event, error) => {
          reject(error)
        })
        ipcRenderer.send('get-inventory-categories')
      })
    },
    createInventoryCategory: (category: InventoryCategoryInput): Promise<InventoryCategory> => {
      return new Promise((resolve, reject) => {
        ipcRenderer.once('create-inventory-category-response', (_event, createdCategory) => {
          resolve(createdCategory)
        })
        ipcRenderer.once('create-inventory-category-error', (_event, error) => {
          reject(error)
        })
        ipcRenderer.send('create-inventory-category', category)
      })
    }
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
