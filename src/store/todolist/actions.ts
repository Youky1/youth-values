import {ADD_TODO_ITEM, SET_TODO_ITEM, UPDATE_TODO_ITEM} from './constants';
import {ITodoItem, ITodoItems} from '~/@types/todolist';
export const addTodoItemAction = (payload: ITodoItem) => ({
  type: ADD_TODO_ITEM,
  payload,
});
export const setTodoItemListAction = (payload: ITodoItems) => ({
  type: SET_TODO_ITEM,
  payload,
});
export const updateTodoItemAction = (payload: ITodoItem) => ({
  type: UPDATE_TODO_ITEM,
  payload,
});
