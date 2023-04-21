import { CheckoutMethod, InventoryCategory, InventoryItem } from '@shared/models'
import { ComputedRef, Ref } from 'vue'

export interface MenuContextInterface {
  loading: Ref<boolean>
  taxRate: Ref<string | undefined>
  categories: Ref<InventoryCategory[]>
  selectedCategory: Ref<InventoryCategory['id'] | undefined>
  selectedItems: Record<string, number>
  selectedCheckoutMethod: Ref<CheckoutMethod | undefined>
  checkoutMethods: { text: string; value: CheckoutMethod; icon: string }[]
  hasSelectedItems: ComputedRef<boolean>
  preview: ComputedRef<Record<string, number>>
  isItemSelected: (id: InventoryItem['id']) => boolean
  getSelectedItemIndexById: (id: InventoryItem['id']) => number
  getInventoryItemById: (id: string) => InventoryItem | undefined
  handleQuantityUpdate: (id: InventoryItem['id'], quantity: 1 | -1) => void
  handleOrderReset: () => void
}
