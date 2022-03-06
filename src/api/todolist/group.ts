// eslint-disable-next-line node/no-extraneous-import
import localforage from 'localforage';
import {message} from 'antd';

export const getGroupList = () => localforage.getItem('groupList');

export const addGroup = async (name: string) => {
  try {
    const currentGroupList =
      ((await localforage.getItem('groupList')) as Array<string>) || [];
    if (currentGroupList.includes(name)) {
      message.error('该元素已存在');
      throw new Error('该元素已存在');
    }
    currentGroupList.push(name);
    localforage.setItem('groupList', currentGroupList);
    message.success('添加分组成功');
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
    message.success('删除分组成功');
  } catch (e) {
    console.log(e);
    message.error(String(e));
  }
};
