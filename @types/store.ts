/* eslint-disable @typescript-eslint/no-explicit-any */
import {ITodoItems} from './todolist';
export interface NamedList {
  title: string;
  list: ITodoItems;
}
export interface DefaultTodoListState {
  todolist: ITodoItems;
  isShowDone: boolean;
}
export interface Action {
  type: string;
  payload: any;
}

export interface RootState {
  todolist: DefaultTodoListState;
}
