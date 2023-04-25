import { InjectionKey } from 'vue'
import { MenuContextInterface } from './types'

export const MENU_KEY: InjectionKey<MenuContextInterface> = Symbol('menu-context')
