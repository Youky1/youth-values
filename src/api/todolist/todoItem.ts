// eslint-disable-next-line node/no-extraneous-import
import localforage from 'localforage';
import {ITodoItem, ITodoItems} from '~/@types/todolist';

const getCurrentId = async () => {
  const num = ((await localforage.getItem('currentId')) as number) || 0;
  return Promise.resolve(num);
};

const setCurrentId = (num: number) => localforage.setItem('currentId', num);

export const getTodoList = async () => {
  const list = (await localforage.getItem('todolist')) || [];
  console.log(list);
  return Promise.resolve(list as ITodoItems);
};

export const setTodoList = (list: ITodoItems) =>
  localforage.setItem('todolist', list);

export const addTodoItem = async (item: ITodoItem) => {
  try {
    const currentId = await getCurrentId();
    const list = ((await getTodoList()) as Array<ITodoItem>) || [];
    list.push({...item, id: currentId + 1});
    await setCurrentId(currentId + 1);
    return setTodoList(list);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const updateTodoItem = async (target: ITodoItem) => {
  try {
    const list = await getTodoList();
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === target.id) {
        list[i] = target;
        break;
      }
    }
    return setTodoList(list);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const deleteTodoItem = async (target: number) => {
  try {
    const list = await getTodoList();
    let i = 0;
    let flag = false;
    for (; i < list.length; i++) {
      if ((list[i].id = target)) {
        flag = true;
        break;
      }
    }
    if (flag) {
      list.splice(i, 1);
    }
    return setTodoList(list);
  } catch (e) {
    return Promise.reject(e);
  }
};
