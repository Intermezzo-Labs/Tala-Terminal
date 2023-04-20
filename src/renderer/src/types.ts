import { InventoryCategory, InventoryItem } from '@shared/models'
import { ComputedRef, Ref } from 'vue'

export enum PaymentMethod {
  CASH = 'cash',
  DEBIT_CARD = 'debit-card',
  E_WALLET = 'e-wallet'
}

export interface MenuContextInterface {
  loading: Ref<boolean>
  taxRate: Ref<string | undefined>
  categories: Ref<InventoryCategory[]>
  selectedCategory: Ref<InventoryCategory['id'] | undefined>
  selectedItems: Record<string, number>
  selectedPaymentMethod: Ref<PaymentMethod | undefined>
  paymentMethods: { text: string; value: PaymentMethod; icon: string }[]
  hasSelectedItems: ComputedRef<boolean>
  preview: ComputedRef<Record<string, number>>
  isItemSelected: (id: InventoryItem['id']) => boolean
  getSelectedItemIndexById: (id: InventoryItem['id']) => number
  getInventoryItemById: (id: string) => InventoryItem | undefined
  handleQuantityUpdate: (id: InventoryItem['id'], quantity: 1 | -1) => void
  handleOrderReset: () => void
  handlePlaceOrder: () => void
}
