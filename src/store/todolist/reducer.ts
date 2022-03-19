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
} from './constants';
const defaultState: DefaultTodoListState = {
  todolist: [],
};
export default function (state = defaultState, action: Action) {
  const newState = cloneDeep(state);
  const {type, payload} = action;
  switch (type) {
    case SET_TODO_LIST: {
      newState.todolist = payload;
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
