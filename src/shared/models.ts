import { resources } from 'coinbase-commerce-node'

export enum SettingKey {
  // Company Information
  COMPANY_NAME = 'companyName',
  COMPANY_ADDRESS = 'companyAddress',
  COMPANY_PHONE = 'companyPhone',
  //   Tax Rates
  TAX_RATE = 'taxRate',
  //   Payment Gateways
  BITCOIN_ACCOUNT = 'bitcoinAccount',
  //   Default Settings
  CURRENCY = 'currency',
  LANGUAGE = 'language',
  TIMEZONE = 'timezone',
  // User Preferences
  RECEIPT_FOOTER = 'receiptFooter'
}

export enum CheckoutMethod {
  CASH = 'cash',
  CREDIT_CARD = 'credit-card',
  E_WALLET = 'e-wallet'
}

export enum CheckoutStatus {
  PAID = 'paid',
  PENDING = 'pending',
  FAILED = 'failed'
}

export interface Setting {
  key: SettingKey
  value?: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
}

export interface BaseItem {
  id: string
  name: string
  price: number
  quantity: number
}

export type InventoryItem = BaseItem & {
  description?: string
  disabled?: boolean
  categories?: InventoryCategory[]
}

export interface InventoryCategory {
  id: string
  name: string
  items?: InventoryItem[]
}

export type OrderItem = BaseItem & {
  order: Order
}

export interface Order {
  id: string
  datetime: Date
  items: OrderItem[]
  checkout: Checkout | null
}

export interface Checkout {
  id: string
  method: CheckoutMethod
  amount: number
  datetime: Date
  refId?: string
  status: CheckoutStatus
  order: Order
  customer?: Customer
}

export type CustomerInput = Partial<Omit<Customer, 'id'>>
export type InventoryItemInput = Omit<InventoryItem, 'id'>
export type InventoryCategoryInput = Omit<InventoryCategory, 'id'>
export interface OrderInput {
  items: Record<InventoryItem['id'], OrderItem['quantity']>
}
export type CheckoutInput = Pick<Checkout, 'method' | 'refId'> & {
  orderId: Order['id']
  customerId: Customer['id']
}
export type CheckoutPreview = Pick<Checkout, 'amount' | 'order'>

export interface CoinbaseChargeArgs {
  description: string
  amount: string
  metadata?: Record<string, unknown>
}
export type CoinbaseChargeResponse = resources.Charge
