export interface Checkout {
  id: string
  amount: number
  datetime: Date
  customerId: string // foreign key to Customer entity
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
}

export interface Order {
  id: string
  datetime: Date
  customerId: string // foreign key to Customer entity
  checkoutId: string // foreign key to Checkout entity
}

export interface OrderItem {
  id: string
  quantity: number
  price: number
  orderId: string // foreign key to Order entity
  inventoryItemId: string // foreign key to InventoryItem entity
}

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
