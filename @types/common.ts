import {ITodoItem} from './todolist';

export interface HeaderMenu {
  text: string;
  icon: string;
  path: string;
}

export interface InputConfig {
  callback: Function;
  icon: string;
  tip?: string;
  placeholder?: string;
  defaultContent?: string;
  clear?: boolean;
}

export interface EditorConfig {
  callback: Function;
  initObj?: ITodoItem;
  clear?: boolean;
  showDetail?: boolean;
}
