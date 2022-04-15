import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducerTodoList from './todolist/reducer';
import reducerTiming from './timing/reducer';
const reducer = combineReducers({
  todolist: reducerTodoList,
  timing: reducerTiming,
});

const store = createStore(reducer, applyMiddleware(thunk));
export default store;
