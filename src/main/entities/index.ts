import { EntitySchema } from 'typeorm'
import { Checkout, Customer, InventoryItem, Order, OrderItem, Setting } from '../../shared/models'

export const SettingSchema = new EntitySchema<Setting>({
  name: 'setting',
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
      type: 'varchar',
      nullable: false
    },
    description: {
      type: 'text'
    },
    price: {
      type: 'float'
    },
    quantity: {
      type: 'int'
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
      type: 'int',
      nullable: false
    },
    price: {
      type: 'int'
    }
  },
  relations: {
    inventoryItem: {
      type: 'many-to-one',
      target: 'inventoryItem',
      joinColumn: { name: 'inventoryItemId' }
    },
    order: {
      type: 'many-to-one',
      target: 'order',
      joinColumn: { name: 'orderId' }
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
    }
  },
  relations: {
    items: {
      type: 'one-to-many',
      target: 'orderItem',
      inverseSide: 'order',
      cascade: ['insert']
    }
  }
})

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
    method: {
      type: 'varchar',
      nullable: false
    }
  },
  relations: {
    customer: {
      type: 'many-to-one',
      target: 'customer',
      joinColumn: { name: 'customerId' }
    },
    order: {
      type: 'one-to-one',
      target: 'order',
      joinColumn: { name: 'orderId' }
    }
  }
})
