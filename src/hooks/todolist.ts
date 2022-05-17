import {useDispatch, useSelector} from 'react-redux';
import {getTodoList} from '@/api/todolist/todoItem';
import {setTodoItemListAction} from '~/src/redux/todolist/actions';
import {ITodoItems} from '~/@types/todolist';
import {RootState} from '~/@types/store';
import {useEffect, useState} from 'react';
import {getGroup} from '@/api/todolist';
import {sortList, timeFillter} from '@/util';

// 获取代办列表
export const useInitTodoList = ({
  sort,
  hideDone,
}: {
  sort: boolean;
  hideDone: boolean;
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    getTodoList()
      .then(res => {
        const list = hideDone ? res.filter(item => !item.done) : res;
        dispatch(setTodoItemListAction(list as ITodoItems));
      })
      .catch(e => console.log(e));
  }, []);
  return useSelector((state: RootState) => {
    const {todolist, showDdl, showGroup, showLevel, showDone} = state.todolist;
    let filterList = todolist;
    if (!showDone && hideDone) {
      filterList = filterList.filter(item => !item.done);
    }
    if (showLevel !== '全部') {
      filterList = filterList.filter(item => item.level === showLevel);
    }
    if (showDdl !== '全部') {
      filterList = filterList.filter(item => timeFillter(item, showDdl));
    }
    if (showGroup !== '全部') {
      filterList = filterList.filter(item => item.group === showGroup);
    }
    return sort ? sortList(filterList) : todolist;
  });
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
