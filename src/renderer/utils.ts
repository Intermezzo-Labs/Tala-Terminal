import { CheckoutMethod } from '@shared/models'
import { InjectionKey, inject } from 'vue'

export function requireInjection<T>(key: InjectionKey<T>, defaultValue?: T): T {
  const resolved = inject(key, defaultValue)
  if (!resolved) {
    throw new Error(`${key} was not provided.`)
  }
  return resolved
}

export function formatCurrency(
  value: number | string | undefined,
  currency = 'USD'
): number | string | undefined {
  if (isNaN(Number(value))) return value
  const formatter = new Intl.NumberFormat('en-US', {
    currency,
    style: 'currency',
    minimumFractionDigits: 0
  })
  return formatter.format(Number(value))
}

interface CheckoutMethodItem {
  text: string
  value: CheckoutMethod
  icon: string
}
export const checkoutMethods: CheckoutMethodItem[] = [
  {
    text: 'Cash',
    value: CheckoutMethod.CASH,
    icon: 'cash'
  },
  {
    text: 'Credit Card',
    value: CheckoutMethod.CREDIT_CARD,
    icon: 'credit-card'
  },
  {
    text: 'E-Wallet',
    value: CheckoutMethod.E_WALLET,
    icon: 'qr-code'
  }
]
