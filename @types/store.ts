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
  showDone: boolean;
  showDdl: '全部' | '已过期' | '本周' | '本月';
  showLevel: '全部' | '高' | '中' | '低' | '无';
  showGroup: string;
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
