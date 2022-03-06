/* eslint-disable @typescript-eslint/no-explicit-any */
import {ITodoItem} from './todolist';
export interface DefaultTodoListState {
  todolist: Array<ITodoItem>;
  isShowAdd: boolean;
}
export interface Action {
  type: string;
  payload: any;
}

export interface RootState {
  todolist: DefaultTodoListState;
}
