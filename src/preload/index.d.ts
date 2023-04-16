import { ElectronAPI } from '@electron-toolkit/preload'
import {
  InventoryItem,
  InventoryItemInput,
  Setting,
  InventoryCategory,
  InventoryCategoryInput
} from 'src/shared/models'

export interface CustomAPI {
  settings: {
    getSettings: () => Promise<Setting[]>
    updateSetting: (key: string, value: string) => Promise<Setting[]>
  }
  inventory: {
    getInventoryItems: () => Promise<InventoryItem[]>
    createInventoryItem: (item: InventoryItemInput) => Promise<InventoryItem>
    updateInventoryItem: (item: InventoryItem) => Promise<InventoryItem | null>
    getInventoryCategories: () => Promise<InventoryCategory[]>
    createInventoryCategory: (item: InventoryCategoryInput) => Promise<InventoryCategory>
  }
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: CustomAPI
  }
}
