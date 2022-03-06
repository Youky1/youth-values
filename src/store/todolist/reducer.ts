import {DefaultTodoListState, Action} from '~/@types/store';
import {cloneDeep} from 'lodash';
import {SET_TODO_ITEM, ADD_TODO_ITEM} from './constants';
const defaultState: DefaultTodoListState = {
  todolist: [],
  isShowAdd: false,
};
export default function (state = defaultState, action: Action) {
  const newState = cloneDeep(state);
  const {type, payload} = action;
  switch (type) {
    case SET_TODO_ITEM: {
      newState.todolist = payload;
      return newState;
    }
    case ADD_TODO_ITEM: {
      newState.todolist.push(payload);
      return newState;
    }
    default:
      return newState;
  }
}
