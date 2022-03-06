import {ADD_TODO_ITEM, SET_TODO_ITEM} from './constants';
import {ITodoItem, ITodoItems} from '~/@types/todolist';
export const addTodoItemAction = (payload: ITodoItem) => ({
  type: ADD_TODO_ITEM,
  payload,
});
export const setTodoItemAction = (payload: ITodoItems) => ({
  type: SET_TODO_ITEM,
  payload,
});
