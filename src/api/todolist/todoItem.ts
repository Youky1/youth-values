// eslint-disable-next-line node/no-extraneous-import
import localforage from 'localforage';
import {ITodoItem} from '~/@types/todolist';

const getCurrentId = () => localforage.getItem('currentId');

const setCurrentId = (num: number) => localforage.setItem('currentId', num);

export const getTodoList = () => localforage.getItem('todolist');

export const addTodoItem = async (item: ITodoItem) => {
  try {
    const currentId = Number(await getCurrentId());
    const list = ((await getTodoList()) as Array<ITodoItem>) || [];
    list.push({...item, id: currentId + 1});
    await setCurrentId(currentId + 1);
    await localforage.setItem('todolist', list);
    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  }
};

export const clearTodoItem = async (key: number) => {
  try {
    await localforage.setItem('todolist', []);
    await setCurrentId(0);
  } catch (e) {
    return Promise.reject(e);
  }
};
