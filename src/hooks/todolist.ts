import {useDispatch, useSelector} from 'react-redux';
import {getTodoList} from '@/api/todolist/todoItem';
import {setTodoItemListAction} from '~/src/redux/todolist/actions';
import {ITodoItems} from '~/@types/todolist';
import {RootState} from '~/@types/store';
import {useEffect, useState} from 'react';
import {getGroup} from '@/api/todolist';
import {sortList} from '@/util';

// 获取代办列表
export const useInitTodoList = (sort?: boolean) => {
  const dispatch = useDispatch();
  useEffect(() => {
    getTodoList()
      .then(list => dispatch(setTodoItemListAction(list as ITodoItems)))
      .catch(e => console.log(e));
  }, []);
  return useSelector((state: RootState) =>
    sort ? sortList(state.todolist.todolist) : state.todolist.todolist
  );
};

// 获取代办事项分组
export const useInitGroups = () => {
  const [groupArr, setGroupArr] = useState<Array<string>>([]);
  useEffect(() => {
    getGroup().then(data => {
      setGroupArr(data);
    });
  });
  return groupArr;
};
