import {DefaultTodoListState, Action} from '~/@types/store';
import {ITodoItems} from '~/@types/todolist';
import {cloneDeep} from 'lodash';
import {
  SET_TODO_LIST,
  ADD_TODO_ITEM,
  UPDATE_TODO_ITEM,
  DELETE_TODO_ITEM,
  TOGGLE_TODO_ITEM,
  SEARCH_TODO_ITEM,
  SET_SHOW_DONE,
  SET_SHOW_LEVEL,
  SET_SHOW_DDL,
  SET_SHOW_GROUP,
} from './constants';
const defaultState: DefaultTodoListState = {
  todolist: [],
  isShowDone: true,
};
export default function (state = defaultState, action: Action) {
  const newState = cloneDeep(state);
  const {type, payload} = action;
  switch (type) {
    case SET_SHOW_LEVEL:
    case SET_SHOW_DDL:
    case SET_SHOW_GROUP:
    case SET_TODO_LIST: {
      newState.todolist = payload;
      return newState;
    }
    case SET_SHOW_DONE: {
      newState.isShowDone = payload.isShowDone;
      newState.todolist = payload.list;
      return newState;
    }
    case ADD_TODO_ITEM: {
      newState.todolist.push(payload);
      return newState;
    }
    case UPDATE_TODO_ITEM: {
      for (let i = 0; i < newState.todolist.length; i++) {
        if (newState.todolist[i].id === payload.id) {
          newState.todolist[i] = payload;
          break;
        }
      }
      return newState;
    }
    case DELETE_TODO_ITEM: {
      for (let i = 0; i < newState.todolist.length; i++) {
        if (newState.todolist[i].id === payload) {
          newState.todolist.splice(i, 1);
          break;
        }
      }
      return newState;
    }
    case TOGGLE_TODO_ITEM: {
      for (let i = 0; i < newState.todolist.length; i++) {
        if (newState.todolist[i].id === payload) {
          newState.todolist[i].done = !newState.todolist[i].done;
          break;
        }
      }
      return newState;
    }
    case SEARCH_TODO_ITEM: {
      const {currentList} = payload;
      newState.todolist = (currentList as ITodoItems).filter(item =>
        item.name.includes(payload.name)
      );
      return newState;
    }
    default:
      return newState;
  }
}
