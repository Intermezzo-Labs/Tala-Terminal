import { ElectronAPI } from '@electron-toolkit/preload'
import {
  InventoryItem,
  InventoryItemInput,
  Setting,
  InventoryCategory,
  InventoryCategoryInput
} from 'src/shared/models'
import { DatabaseService } from '../services/db'

export interface CustomAPI {
  settings: {
    getSettings: () => Promise<Setting[]>
    updateSetting: (key: string, value: string) => Promise<Setting[]>
  }
  inventory: {
    getInventoryItems: () => Promise<InventoryItem[]>
    createInventoryItem: (item: InventoryItemInput) => Promise<InventoryItem>
    updateInventoryItem: (item: InventoryItem) => Promise<InventoryItem | null>
    deleteInventoryItem: (id: InventoryItem['id']) => Promise<void>
    getInventoryCategories: () => Promise<InventoryCategory[]>
    createInventoryCategory: (item: InventoryCategoryInput) => Promise<InventoryCategory>
    updateInventoryCategory: (item: InventoryCategory) => Promise<InventoryCategory | null>
    deleteInventoryCategory: (id: InventoryCategory['id']) => Promise<void>
  }
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: CustomAPI
  }
}
