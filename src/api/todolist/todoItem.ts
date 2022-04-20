import localforage from 'localforage';
import {ITodoItem, ITodoItems} from '~/@types/todolist';

const getCurrentId = async () => {
  const num = ((await localforage.getItem('currentId')) as number) || 0;
  return Promise.resolve(num);
};

const setCurrentId = (num: number) => localforage.setItem('currentId', num);

export const getTodoList = async () => {
  const list = (await localforage.getItem('todolist')) || [];
  return Promise.resolve(list as ITodoItems);
};

export const setTodoList = (list: ITodoItems) =>
  localforage.setItem('todolist', list);

export const addTodoItem = async (item: ITodoItem) => {
  try {
    const currentId = await getCurrentId();
    const list = ((await getTodoList()) as Array<ITodoItem>) || [];
    const newItem = {...item, id: currentId + 1};
    list.push(newItem);
    await setCurrentId(currentId + 1);
    await setTodoList(list);
    return Promise.resolve(newItem);
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
    for (let i = 0; i < list.length; i++) {
      if ((list[i].id = target)) {
        list.splice(i, 1);
        return setTodoList(list);
      }
    }
    return Promise.reject('没有找到该ID');
  } catch (e) {
    return Promise.reject(e);
  }
};

export const toggleTodoItem = async (target: number) => {
  try {
    const itemList = await getTodoList();
    for (const item of itemList) {
      if (item.id === target) {
        return updateTodoItem({...item, done: !item.done});
      }
    }
    return Promise.reject(`没有找到ID: ${target}`);
  } catch (e) {
    return Promise.reject(e);
  }
};
