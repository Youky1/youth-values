import {useDispatch, useSelector} from 'react-redux';
import {getTodoList} from '@/api/todolist/todoItem';
import {setTodoItemAction} from '@/store/todolist/actions';
import {ITodoItems} from '~/@types/todolist';
import {RootState} from '~/@types/store';
import {useEffect} from 'react';

export const useInitTodoList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getTodoList()
      .then(list => dispatch(setTodoItemAction(list as ITodoItems)))
      .catch(e => console.log(e));
  });
  return useSelector((state: RootState) => state.todolist.todolist);
};
