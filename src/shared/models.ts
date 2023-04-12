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
  BITCOIN = 'bitcoin'
}

export interface Setting {
  key: SettingKey
  value?: string
  description?: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
}

interface BaseItem {
  id: string
  name: string
  price: number
  quantity: number
}

export type InventoryItem = BaseItem & {
  description: string
}

export type OrderItem = BaseItem

export interface Order {
  id: string
  datetime: Date
  items: OrderItem[]
}

export interface Checkout {
  id: string
  method: CheckoutMethod
  amount: number
  datetime: Date
  order: Order
  customer: Customer
}

export type CustomerInput = Partial<Omit<Customer, 'id'>>
export type InventoryItemInput = Omit<InventoryItem, 'id'>
export interface OrderInput {
  items: Pick<InventoryItem, 'id' | 'quantity'>[]
}
export type CheckoutInput = Pick<Checkout, 'method' | 'amount'> & {
  orderId: Order['id']
  customerId: Customer['id']
}
