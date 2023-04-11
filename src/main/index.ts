import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { AppDataSource } from './utils/data-source'
import 'reflect-metadata'
import { SettingController } from './controllers/SettingController'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  AppDataSource.destroy()

  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// AppDataSource.initialize()
//   .then(() => {
//     console.log('Data Source has been initialized!')
//   })
//   .catch((err) => {
//     console.error('Error during Data Source initialization', err)
//   })
// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

// Define your database schema and create your tables
// db.serialize(() => {
//   db.run('CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT)')
//   db.run('INSERT INTO todos (text) VALUES (?)', 'Buy groceries')
//   db.run('INSERT INTO todos (text) VALUES (?)', 'Do laundry')
//   db.run('INSERT INTO todos (text) VALUES (?)', 'Clean the house')
// })

const settingsController = new SettingController()
ipcMain.on('get-settings', async (event) => {
  const settings = await settingsController.getAllSettings()
  event.reply('get-settings-response', settings)
})

// ipcMain.on('add-todo', (event, todo: Todo) => {
//   db.prepare('INSERT INTO todos (text) VALUES (?)').run(todo.title ?? 'yhoh')
//   const todos = db.prepare('SELECT * FROM todos').all() as Todo[]
//   event.reply('add-todo-response', todos)
// })

// ipcMain.on('update-todo', (event, todo: Todo) => {
//   db.prepare('UPDATE todos SET title = ?, completed = ? WHERE id = ?').run(
//     todo.title,
//     todo.completed ? 1 : 0,
//     todo.id
//   )
//   const todos = db.prepare('SELECT * FROM todos').all() as Todo[]
//   event.reply('update-todo-response', todos)
// })

// ipcMain.on('delete-todo', (event, id: number) => {
//   db.prepare('DELETE FROM todos WHERE id = ?').run(id)
//   const todos = db.prepare('SELECT * FROM todos').all() as Todo[]
//   event.reply('delete-todo-response', todos)
// })
