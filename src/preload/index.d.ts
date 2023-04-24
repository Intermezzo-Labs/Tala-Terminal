import { ElectronAPI } from '@electron-toolkit/preload'
import {
  InventoryItem,
  InventoryItemInput,
  Setting,
  InventoryCategory,
  InventoryCategoryInput,
  Order,
  CheckoutInput,
  CheckoutPreview
} from 'src/shared/models'
import { GetAllInventoryCategoriesOptions } from 'src/services/db'
import { CoinbaseChargeResponse } from 'src/services/coinbase'

declare global {
  interface Window {
    electron: ElectronAPI
    api: CustomAPI
  }
}

interface CustomAPI {
  settings: {
    getSettings: () => Promise<Setting[]>
    updateSetting: (key: string, value: string) => Promise<Setting[]>
  }
  inventory: {
    getInventoryItems: () => Promise<InventoryItem[]>
    createInventoryItem: (item: InventoryItemInput) => Promise<InventoryItem>
    updateInventoryItem: (item: InventoryItem) => Promise<InventoryItem | null>
    deleteInventoryItem: (id: InventoryItem['id']) => Promise<void>
    getInventoryCategories: (
      options?: GetAllInventoryCategoriesOptions
    ) => Promise<InventoryCategory[]>
    createInventoryCategory: (item: InventoryCategoryInput) => Promise<InventoryCategory>
    updateInventoryCategory: (item: InventoryCategory) => Promise<InventoryCategory | null>
    deleteInventoryCategory: (id: InventoryCategory['id']) => Promise<void>
  }
  order: {
    getOrders: () => Promise<Order[]>
    createOrder: (selectedItems: Record<string, number>) => Promise<Order>
  }
  checkout: {
    createCheckoutPreview: (orderId: CheckoutInput['orderId']) => Promise<CheckoutPreview | null>
    createCheckout: (input: CheckoutInput) => Promise<Checkout>
    createCoinbaseCharge: (orderId: CheckoutInput['orderId']) => Promise<CoinbaseChargeResponse>
  }
}

export default {
  CustomAPI
}
