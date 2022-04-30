/* eslint-disable @typescript-eslint/no-explicit-any */
import {defaultTimingState} from './timing';
import {defaultStatisticState} from './statistics';
import {ITodoItems} from './todolist';
import {UserInfo} from './user';
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
  timing: defaultTimingState;
  statistics: defaultStatisticState;
  user: UserInfo;
}
