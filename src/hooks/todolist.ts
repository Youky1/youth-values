import {useDispatch, useSelector} from 'react-redux';
import {getTodoList} from '@/api/todolist/todoItem';
import {setTodoItemListAction} from '@/store/todolist/actions';
import {ITodoItems} from '~/@types/todolist';
import {RootState} from '~/@types/store';
import {useEffect, useState} from 'react';
import {getGroupList} from '@/api/todolist';

// 获取代办列表
export const useInitTodoList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getTodoList()
      .then(list => dispatch(setTodoItemListAction(list as ITodoItems)))
      .catch(e => console.log(e));
  });
  return useSelector((state: RootState) => state.todolist.todolist);
};

// 获取代办事项分组
export const useInitGroups = () => {
  const [groupArr, setGroupArr] = useState<Array<string>>([]);
  useEffect(() => {
    getGroupList().then(data => {
      setGroupArr(['无', ...(data as Array<string>)]);
    });
  }, []);
  return groupArr;
};
