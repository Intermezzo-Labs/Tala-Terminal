import { app } from 'electron'
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import {
  CheckoutSchema,
  CustomerSchema,
  SettingSchema,
  OrderItemSchema,
  OrderSchema,
  InventoryItemSchema
} from '../entities'
import { DatabaseController } from '../controllers/db'

// Get the app data directory
const appDataPath = app.getPath('userData')

// Set the path to your database file
const dbFilePath = `${appDataPath}/database.sqlite`

// Export your database instance so that you can use it in your renderer process
export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: dbFilePath,
  entities: [
    SettingSchema,
    CheckoutSchema,
    CustomerSchema,
    OrderItemSchema,
    OrderSchema,
    InventoryItemSchema
  ],
  synchronize: true,
  logging: true
})

AppDataSource.initialize()
  .then(async () => {
    const dbController = new DatabaseController()
    await dbController.initializeSettings()
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err)
  })
