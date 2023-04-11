import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { Setting } from '../shared/models'

// Custom APIs for renderer
const api = {
  settings: {
    getSettings: (): Promise<Setting[]> => {
      return new Promise((resolve, reject) => {
        ipcRenderer.once('get-settings-response', (_event, settings) => {
          resolve(settings)
        })
        ipcRenderer.once('get-settings-error', (_event, error) => {
          reject(error)
        })
        ipcRenderer.send('get-settings')
      })
    }
  }
  // addTodo: (todo: Omit<Todo, 'id'>): Promise<Todo[]> => {
  //   return new Promise((resolve, reject) => {
  //     ipcRenderer.once('add-todo-response', (_event, todos) => {
  //       resolve(todos)
  //     })
  //     ipcRenderer.once('add-todo-error', (_event, error) => {
  //       reject(error)
  //     })
  //     ipcRenderer.send('add-todo', todo)
  //   })
  // },
  // updateTodo: (todo: Todo): Promise<Todo[]> => {
  //   return new Promise((resolve, reject) => {
  //     ipcRenderer.once('update-todo-response', (_event, todos) => {
  //       resolve(todos)
  //     })
  //     ipcRenderer.once('update-todo-error', (_event, error) => {
  //       reject(error)
  //     })
  //     ipcRenderer.send('update-todo', todo)
  //   })
  // },
  // deleteTodo: (id: Todo['id']): Promise<Todo[]> => {
  //   return new Promise((resolve, reject) => {
  //     ipcRenderer.once('delete-todo-response', (_event, todos) => {
  //       resolve(todos)
  //     })
  //     ipcRenderer.once('delete-todo-error', (_event, error) => {
  //       reject(error)
  //     })
  //     ipcRenderer.send('delete-todo', id)
  //   })
  // }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
