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

export interface InventoryItem {
  id: string
  name: string
  description: string
  price: number
  quantity: number
}

export interface OrderItem {
  id: string
  quantity: number
  price: number
  order: Order
  inventoryItem: InventoryItem
}
export interface Order {
  id: string
  datetime: Date
  items: OrderItem[]
}

export enum CheckoutMethod {
  CASH = 'cash',
  BITCOIN = 'bitcoin'
}

export interface Checkout {
  id: string
  method: CheckoutMethod
  amount: number
  datetime: Date
  order: Order
  customer: Customer
}
