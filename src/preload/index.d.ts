import { ElectronAPI } from '@electron-toolkit/preload'
import { Todo } from '../shared/types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getTodos: () => Promise<Todo[]>
      addTodo: (todo: Omit<Todo, 'id'>) => Promise<Todo[]>
      updateTodo: (todo: Todo) => Promise<Todo[]>
      deleteTodo: (id: Todo['id']) => Promise<Todo[]>
    }
  }
}
