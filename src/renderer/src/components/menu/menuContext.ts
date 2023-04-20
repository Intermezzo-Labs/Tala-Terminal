import { useProviderValidation } from '@renderer/composables/useProviderValidation'
import { InventoryCategory, InventoryItem } from '@shared/models'
import {
  InjectionKey,
  provide,
  defineComponent,
  h,
  VNode,
  inject,
  Ref,
  ComputedRef,
  reactive,
  ref
} from 'vue'

interface MenuContextInterface {
  loading: Ref<boolean>
  taxRate: Ref<string>
  categories: Ref<InventoryCategory[]>
  selectedItems: { [id: InventoryItem['id']]: number }
  hasSelectedItems: Ref<boolean>
  getSelectedItemIndexById: (id: InventoryItem['id']) => number
  items: ComputedRef<InventoryItem[]>
  getInventoryItemById: (id: string) => InventoryItem | undefined
  handleQuantityUpdate: (id: InventoryItem['id'], quantity: 1 | -1) => void
  preview: ComputedRef<Record<string, string>>
}

export enum PaymentMethod {
  CASH = 'cash',
  DEBIT_CARD = 'debit-card',
  E_WALLET = 'e-wallet'
}

export const MENU_KEY: InjectionKey<MenuContextInterface> = Symbol('menu-context')

export const MyProvider = defineComponent({
  props: {
    // myValue: {
    //   type: String,
    //   required: true
    // }
  },
  setup(props, { slots }) {
    // Validate that myValue is provided
    // useProviderValidation(props.myValue)
    const loading = ref<boolean>()
    const taxRate = ref<string>()
    const categories = ref<InventoryCategory[]>()
    const selectedItems =
      // Provide myValue using InjectionKey and Symbol
      provide(MENU_KEY, {
        loading
      })

    // Render the component and its slot manually
    return (): VNode => h('div', {}, slots.default && slots.default())
  }
})

function requireInjection<T>(key: InjectionKey<T>, defaultValue?: T): T {
  const resolved = inject(key, defaultValue)
  if (!resolved) {
    throw new Error(`${key} was not provided.`)
  }
  return resolved
}
export const menuContext = requireInjection(MENU_KEY)
