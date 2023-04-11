import { EntitySchema } from 'typeorm'
import {
  Checkout,
  Customer,
  InventoryItem,
  Order,
  OrderItem,
  Setting,
  SettingKey
} from '../../shared/models'

export const CheckoutSchema = new EntitySchema<Checkout>({
  name: 'checkout',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid'
    },
    amount: {
      type: 'float'
    },
    datetime: {
      type: 'datetime',
      default: (): Date => 'CURRENT_TIMESTAMP' as unknown as Date
    },
    customerId: {
      type: 'uuid'
    }
  }
})

export const CustomerSchema = new EntitySchema<Customer>({
  name: 'customer',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid'
    },
    name: {
      type: 'varchar'
    },
    email: {
      type: 'varchar'
    },
    phone: {
      type: 'varchar'
    }
  }
})

export const InventoryItemSchema = new EntitySchema<InventoryItem>({
  name: 'inventoryItem',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid'
    },
    name: {
      type: 'varchar'
    },
    description: {
      type: 'text'
    },
    price: {
      type: 'float'
    }
  }
})

export const OrderSchema = new EntitySchema<Order>({
  name: 'order',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid'
    },
    datetime: {
      type: 'datetime',
      default: (): Date => 'CURRENT_TIMESTAMP' as unknown as Date
    },
    customerId: {
      type: 'uuid'
    },
    checkoutId: {
      type: 'uuid'
    }
  }
})

export const OrderItemSchema = new EntitySchema<OrderItem>({
  name: 'orderItem',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid'
    },
    quantity: {
      type: 'int'
    },
    price: {
      type: 'int'
    },
    inventoryItemId: {
      type: 'uuid'
    },
    orderId: {
      type: 'uuid'
    }
  }
})

export const SettingSchema = new EntitySchema<Setting>({
  name: 'Setting',
  columns: {
    key: {
      primary: true,
      type: 'varchar',
      length: 255,
      unique: true,
      nullable: false
    },
    value: {
      type: 'varchar',
      length: 255,
      nullable: false
    },
    description: {
      type: 'text',
      nullable: true
    }
  }
})
