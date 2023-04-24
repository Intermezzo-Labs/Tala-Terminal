import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import {
  Setting,
  InventoryItem,
  InventoryItemInput,
  InventoryCategoryInput,
  InventoryCategory,
  Order,
  Checkout,
  CheckoutInput,
  CheckoutPreview
} from '../shared/models'
import { GetAllInventoryCategoriesOptions } from '../services/db'
import { CoinbaseChargeResponse } from '../services/coinbase'

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
    deleteInventoryItem: (id: InventoryItem['id']): Promise<void> => {
      return new Promise((resolve, reject) => {
        ipcRenderer.once('delete-inventory-item-response', () => {
          resolve()
        })
        ipcRenderer.once('delete-inventory-item-error', (_event, error) => {
          reject(error)
        })
        ipcRenderer.send('delete-inventory-item', id)
      })
    },
    getInventoryCategories: (
      options?: GetAllInventoryCategoriesOptions
    ): Promise<InventoryCategory[]> => {
      return new Promise((resolve, reject) => {
        ipcRenderer.once('get-inventory-categories-response', (_event, items) => {
          resolve(items)
        })
        ipcRenderer.once('get-inventory-categories-error', (_event, error) => {
          reject(error)
        })
        ipcRenderer.send('get-inventory-categories', options)
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
    },
    updateInventoryCategory: (category: InventoryCategory): Promise<InventoryCategory | null> => {
      return new Promise((resolve, reject) => {
        ipcRenderer.once('update-inventory-category-response', (_event, updatedCategory) => {
          resolve(updatedCategory)
        })
        ipcRenderer.once('update-inventory-category-error', (_event, error) => {
          reject(error)
        })
        ipcRenderer.send('update-inventory-category', category)
      })
    },
    deleteInventoryCategory: (id: InventoryCategory['id']): Promise<void> => {
      return new Promise((resolve, reject) => {
        ipcRenderer.once('delete-inventory-category-response', () => {
          resolve()
        })
        ipcRenderer.once('delete-inventory-category-error', (_event, error) => {
          reject(error)
        })
        ipcRenderer.send('delete-inventory-category', id)
      })
    }
  },
  order: {
    getOrders: (): Promise<Order[]> => {
      return new Promise((resolve, reject) => {
        ipcRenderer.once('get-orders-response', (_event, items) => {
          resolve(items)
        })
        ipcRenderer.once('get-orders-error', (_event, error) => {
          reject(error)
        })
        ipcRenderer.send('get-orders')
      })
    },
    createOrder: (selectedItems: Record<string, number>): Promise<Order> => {
      return new Promise((resolve, reject) => {
        ipcRenderer.once('create-order-response', (_event, createdOrder) => {
          resolve(createdOrder)
        })
        ipcRenderer.once('create-order-error', (_event, error) => {
          reject(error)
        })
        ipcRenderer.send('create-order', selectedItems)
      })
    }
  },
  checkout: {
    createCheckoutPreview: (orderId: CheckoutInput['orderId']): Promise<CheckoutPreview | null> => {
      return new Promise((resolve, reject) => {
        ipcRenderer.once('create-checkout-preview-response', (_event, preview) => {
          resolve(preview)
        })
        ipcRenderer.once('create-checkout-preview-error', (_event, error) => {
          reject(error)
        })
        ipcRenderer.send('create-checkout-preview', orderId)
      })
    },
    createCheckout: (input: CheckoutInput): Promise<Checkout> => {
      return new Promise((resolve, reject) => {
        ipcRenderer.once('create-checkout-response', (_event, checkout) => {
          resolve(checkout)
        })
        ipcRenderer.once('create-checkout-error', (_event, error) => {
          reject(error)
        })
        ipcRenderer.send('create-checkout', input)
      })
    },
    createCoinbaseCharge: (orderId: CheckoutInput['orderId']): Promise<CoinbaseChargeResponse> => {
      return new Promise((resolve, reject) => {
        ipcRenderer.once('create-coinbase-charge-response', (_event, checkout) => {
          resolve(checkout)
        })
        ipcRenderer.once('create-coinbase-charge-error', (_event, error) => {
          reject(error)
        })
        ipcRenderer.send('create-coinbase-charge', orderId)
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
