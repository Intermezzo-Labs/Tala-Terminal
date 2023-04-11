import { ElectronAPI } from '@electron-toolkit/preload'
import { Setting } from 'src/shared/models'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      settings: {
        getSettings: () => Promise<Setting[]>
      }
      // addTodo: (todo: Omit<Todo, 'id'>) => Promise<Todo[]>
      // updateTodo: (todo: Todo) => Promise<Todo[]>
      // deleteTodo: (id: Todo['id']) => Promise<Todo[]>
    }
  }
}
