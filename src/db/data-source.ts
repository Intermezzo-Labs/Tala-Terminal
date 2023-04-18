import { app } from 'electron'
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import {
  CheckoutSchema,
  CustomerSchema,
  SettingSchema,
  OrderItemSchema,
  OrderSchema,
  InventoryCategorySchema,
  InventoryItemSchema
} from './entities'
import { DatabaseService } from '../services/db'
import { Setting, SettingKey } from '../shared/models'
import defaultSettings from '../services/defaultSettings.json'

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
    InventoryCategorySchema,
    InventoryItemSchema
  ],
  synchronize: false,
  logging: true
})

AppDataSource.initialize()
  .then(async () => {
    await initializeSettings()
    console.log('Data Source has been initialized!', appDataPath)
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err)
  })

async function initializeSettings(): Promise<void> {
  const service = new DatabaseService()
  const initialSettings: Setting[] = Object.values(SettingKey).map((key) => ({
    key,
    value: defaultSettings[key].value,
    description: defaultSettings[key].description
  }))

  // Check if each setting exists, and if not, create it with the default value
  for (const setting of initialSettings) {
    const existingSetting = await service.getSettingByKey(setting.key)
    if (!existingSetting) {
      await service.createSetting(setting)
    }
  }
}
