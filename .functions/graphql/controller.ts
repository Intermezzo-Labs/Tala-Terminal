import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { AppDataSource } from '../db/data-source'
import { DatabaseService } from '../services/db'
import { CheckoutMethod, CheckoutStatus, SettingKey } from '../shared/models'
import { createCoinbaseCharge, getCoinbaseChargeByCodeOrId } from '../services/coinbase'
import { isPast } from 'date-fns'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
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

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

const dbService = new DatabaseService()

// function createIpcHandler(
//   asyncFunction: (...args: unknown[]) => Promise<unknown>,
//   functionName: string
// ): (event: Electron.IpcMainEvent, ...args: unknown[]) => void {
//   const successEvent = `${functionName}-response`
//   const errorEvent = `${functionName}-error`

//   return async (event: Electron.IpcMainEvent, args: unknown) => {
//     try {
//       const result = await asyncFunction(args)
//       event.reply(successEvent, result)
//     } catch (error) {
//       event.reply(errorEvent, error)
//     }
//   }
// }

// ipcMain.on(
//   EventName.READ_INVENTORY_ITEMS,
//   createIpcHandler(dbService.getAllInventoryItems, EventName.READ_INVENTORY_ITEMS)
// )

ipcMain.on('get-settings', async (event) => {
  try {
    const settings = await dbService.getAllSettings()
    event.reply('get-settings-response', settings)
  } catch (error) {
    event.reply('get-settings-error', error)
  }
})
ipcMain.on('update-setting', async (event, key: string, value: string) => {
  try {
    const setting = await dbService.updateSetting(key as SettingKey, { value })
    event.reply('update-setting-response', setting)
  } catch (error) {
    event.reply('update-setting-error', error)
  }
})

ipcMain.on('get-inventory-items', async (event) => {
  try {
    const items = await dbService.getAllInventoryItems()
    event.reply('get-inventory-items-response', items)
  } catch (error) {
    event.reply('get-inventory-items-error', error)
  }
})
ipcMain.on('create-inventory-item', async (event, args) => {
  try {
    const item = await dbService.createInventoryItem(args)
    event.reply('create-inventory-item-response', item)
  } catch (error) {
    event.reply('create-inventory-item-error', error)
  }
})
ipcMain.on('update-inventory-item', async (event, args) => {
  try {
    const item = await dbService.updateInventoryItem(args)
    event.reply('update-inventory-item-response', item)
  } catch (error) {
    event.reply('update-inventory-item-error', error)
  }
})
ipcMain.on('delete-inventory-item', async (event, args) => {
  try {
    const item = await dbService.deleteInventoryItem(args)
    event.reply('delete-inventory-item-response', item)
  } catch (error) {
    event.reply('delete-inventory-item-error', error)
  }
})
ipcMain.on('get-inventory-categories', async (event, args) => {
  try {
    const categories = await dbService.getAllInventoryCategories(args)
    event.reply('get-inventory-categories-response', categories)
  } catch (error) {
    event.reply('get-inventory-categories-error', error)
  }
})
ipcMain.on('create-inventory-category', async (event, args) => {
  try {
    const category = await dbService.createInventoryCategory(args)
    event.reply('create-inventory-category-response', category)
  } catch (error) {
    event.reply('create-inventory-category-error', error)
  }
})
ipcMain.on('update-inventory-category', async (event, args) => {
  try {
    const item = await dbService.updateInventoryCategory(args)
    event.reply('update-inventory-category-response', item)
  } catch (error) {
    event.reply('update-inventory-category-error', error)
  }
})
ipcMain.on('delete-inventory-category', async (event, args) => {
  try {
    const item = await dbService.deleteInventoryCategory(args)
    event.reply('delete-inventory-category-response', item)
  } catch (error) {
    event.reply('delete-inventory-category-error', error)
  }
})

ipcMain.on('get-order', async (event, args) => {
  try {
    const order = await dbService.getOrderById(args)
    event.reply('get-order-response', order)
  } catch (error) {
    event.reply('get-order-error', error)
  }
})
ipcMain.on('get-orders', async (event) => {
  try {
    const orders = await dbService.getAllOrders()
    event.reply('get-orders-response', orders)
  } catch (error) {
    event.reply('get-orders-error', error)
  }
})
ipcMain.on('create-order', async (event, args) => {
  try {
    const order = await dbService.createOrder(args)
    event.reply('create-order-response', order)
  } catch (error) {
    event.reply('create-order-error', error)
  }
})

ipcMain.on('get-checkout', async (event, args) => {
  try {
    let checkout = await dbService.getCheckoutById(args)
    if (checkout?.status !== CheckoutStatus.PAID) {
      if (checkout?.method === CheckoutMethod.E_WALLET && checkout.refId) {
        const charge = await getCoinbaseChargeByCodeOrId(checkout.refId)
        if (!charge) throw new Error(`Coinbase charge doesn't exist. Ref ID ${checkout.refId}`)
        const status = charge.confirmed_at
          ? CheckoutStatus.PAID
          : isPast(new Date(charge.expires_at))
          ? CheckoutStatus.FAILED
          : CheckoutStatus.PENDING
        checkout = await dbService.updateCheckout({ ...checkout, status })
      }
    }
    event.reply('get-checkout-response', checkout)
  } catch (error) {
    event.reply('get-checkout-error', error)
  }
})
ipcMain.on('create-checkout-preview', async (event, args) => {
  try {
    const order = await dbService.createCheckoutPreview(args)
    event.reply('create-checkout-preview-response', order)
  } catch (error) {
    event.reply('create-checkout-preview-error', error)
  }
})
ipcMain.on('create-checkout', async (event, args) => {
  try {
    const order = await dbService.createCheckout(args)
    event.reply('create-checkout-response', order)
  } catch (error) {
    event.reply('create-checkout-error', error)
  }
})
ipcMain.on('create-coinbase-charge', async (event, orderId) => {
  try {
    const preview = await dbService.createCheckoutPreview(orderId)
    if (!preview) throw new Error(`Order ${orderId} doesn't exist!`)
    if (!preview.amount) throw new Error(`Amount cannot be null. Order ${orderId}`)

    const charge = await createCoinbaseCharge({
      amount: String(preview.amount),
      description: preview.order.items.map((i) => `${i.name} (x${i.quantity})`).join(', '),
      metadata: preview
    })
    event.reply('create-coinbase-charge-response', charge)
  } catch (error) {
    event.reply('create-coinbase-charge-error', error)
  }
})
ipcMain.on('delete-checkout', async (event, args) => {
  try {
    const item = await dbService.deleteCheckout(args)
    event.reply('delete-checkout-response', item)
  } catch (error) {
    event.reply('delete-checkout-error', error)
  }
})
