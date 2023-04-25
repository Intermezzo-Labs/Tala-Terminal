import { ElectronAPI } from '@electron-toolkit/preload'
import {
  InventoryItem,
  InventoryItemInput,
  Setting,
  InventoryCategory,
  InventoryCategoryInput,
  Order,
  CheckoutInput,
  CheckoutPreview,
  CoinbaseChargeResponse,
  Checkout
} from 'src/shared/models'
import { GetAllInventoryCategoriesOptions } from 'src/services/db'

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
    getOrder: (orderId: Order['id']) => Promise<Order | null>
    createOrder: (selectedItems: Record<string, number>) => Promise<Order>
  }
  checkout: {
    getCheckout: (checkoutId: Checkout['id']) => Promise<Checkout | null>
    createCheckoutPreview: (orderId: CheckoutInput['orderId']) => Promise<CheckoutPreview | null>
    createCheckout: (input: CheckoutInput) => Promise<Checkout>
    createCoinbaseCharge: (orderId: CheckoutInput['orderId']) => Promise<CoinbaseChargeResponse>
  }
}

export default {
  CustomAPI
}
