import localforage from 'localforage';
import {successTip, failTip} from '@/util';
import {getTodoList, setTodoList} from './todoItem';

export const getGroup = async () => {
  const groups = (await localforage.getItem('groupList')) || [];
  return Promise.resolve(groups as Array<string>);
};

export const addGroup = async (name: string) => {
  if (!name) {
    failTip('分组名不能为空');
    return;
  }
  try {
    const currentGroupList =
      ((await localforage.getItem('groupList')) as Array<string>) || [];
    if (currentGroupList.includes(name)) {
      failTip('该元素已存在');
      throw new Error('该元素已存在');
    }
    currentGroupList.push(name);
    await localforage.setItem('groupList', currentGroupList);
    successTip('添加分组成功');
  } catch (e) {
    console.log(e);
  }
};

export const removeGroup = async (name: string) => {
  try {
    const currentGroupList =
      ((await localforage.getItem('groupList')) as Array<string>) || [];
    const index = currentGroupList.indexOf(name);
    if (index > currentGroupList.length) {
      throw new Error('下标不存在');
    } else {
      currentGroupList.splice(index, 1);
      await localforage.setItem('groupList', currentGroupList);
      const list = await getTodoList();
      await setTodoList(
        list.map(item => {
          if (item.group === name) {
            item.group = '无';
          }
          return item;
        })
      );
    }
    successTip('删除分组成功');
  } catch (e) {
    console.log(e);
    failTip(String(e));
  }
};
