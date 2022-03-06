import {createStore, combineReducers} from 'redux';
import reducerTodoList from './todolist/reducer';
const reducer = combineReducers({
  todolist: reducerTodoList,
});

const store = createStore(reducer);
export default store;
