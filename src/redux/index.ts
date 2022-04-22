import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducerTodoList from './todolist/reducer';
import reducerTiming from './timing/reducer';
import reducerStatistics from './statistics/reducer';
const reducer = combineReducers({
  todolist: reducerTodoList,
  timing: reducerTiming,
  statistics: reducerStatistics,
});

const store = createStore(reducer, applyMiddleware(thunk));
export default store;
