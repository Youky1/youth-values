import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducerTodoList from './todolist/reducer';
const reducer = combineReducers({
  todolist: reducerTodoList,
});

const store = createStore(reducer, applyMiddleware(thunk));
export default store;
