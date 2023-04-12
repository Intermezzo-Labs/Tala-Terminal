import { ElectronAPI } from '@electron-toolkit/preload'
import { InventoryItem, NewInventoryItem, Setting } from 'src/shared/models'

export interface CustomAPI {
  settings: {
    getSettings: () => Promise<Setting[]>
    updateSetting: (key: string, value: string) => Promise<Setting[]>
  }
  inventory: {
    getInventoryItems: () => Promise<InventoryItem[]>
    createInventoryItem: (item: NewInventoryItem) => Promise<InventoryItem>
    updateInventoryItem: (item: InventoryItem) => Promise<InventoryItem | null>
  }
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: CustomAPI
  }
}
