import { app } from 'electron'
import Database, { Database as BetterSqliteDatabase } from 'better-sqlite3'

// Get the app data directory
const appDataPath = app.getPath('userData')

// Set the path to your database file
const dbFilePath = `${appDataPath}/database.sqlite`

// Create a new database instance and connect to the file
const db: BetterSqliteDatabase = new Database(dbFilePath, { verbose: console.log })

// Export your database instance so that you can use it in your renderer process
export default db
