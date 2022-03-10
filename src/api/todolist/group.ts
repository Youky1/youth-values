// eslint-disable-next-line node/no-extraneous-import
import localforage from 'localforage';
import {successTip, failTip} from '@/util';

export const getGroupList = () => localforage.getItem('groupList');

export const addGroup = async (name: string) => {
  try {
    const currentGroupList =
      ((await localforage.getItem('groupList')) as Array<string>) || [];
    if (currentGroupList.includes(name)) {
      failTip('该元素已存在');
      throw new Error('该元素已存在');
    }
    currentGroupList.push(name);
    localforage.setItem('groupList', currentGroupList);
    successTip('添加分组成功');
  } catch (e) {
    console.log(e);
  }
};

export const removeGroupList = async (index: number) => {
  try {
    const currentGroupList =
      ((await localforage.getItem('groupList')) as Array<string>) || [];
    if (index > currentGroupList.length) {
      throw new Error('下标不存在');
    } else {
      currentGroupList.splice(index, 1);
      await localforage.setItem('groupList', currentGroupList);
    }
    successTip('删除分组成功');
  } catch (e) {
    console.log(e);
    failTip(String(e));
  }
};
