import localforage from 'localforage';
import {UserInfo} from '~/@types/user';
import {failTip} from '~/src/util';
import instance from '../base';

export const getUserInfo = async () =>
  (await localforage.getItem('userInfo')) as UserInfo;
export const setUserInfo = async (info: UserInfo | null) =>
  await localforage.setItem('userInfo', info);

export const login = async (id: string, password: string) => {
  try {
    const res = await instance.get('/user/login', {params: {id, password}});
    await setUserInfo({id, password});
    return Promise.resolve(res);
  } catch (e) {
    failTip(e);
    return Promise.reject(e);
  }
};

export const autoLogin = async () => {
  const userInfo = await getUserInfo();
  if (userInfo) {
    const {id, password} = userInfo;
    await login(id, password);
    return Promise.resolve({id, password});
  } else {
    return Promise.reject();
  }
};

export const signup = async (id: string, password: string) => {
  try {
    const res = await instance.post('/user/signup', {
      id,
      password,
    });
    await setUserInfo({id, password});
    return Promise.resolve(res);
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
};

export const signOut = async () => {
  await setUserInfo(null);
  window.location.reload();
};

export const changePassword = async (newPwd: string) => {
  const {id, password} = await getUserInfo();
  await instance.post('/user/update', {
    id,
    password,
    newPassword: newPwd,
  });
  await setUserInfo({id, password: newPwd});
};

export const removeUser = async () => {
  try {
    const {id, password} = await getUserInfo();
    await instance.post('/user/remove', {
      id,
      password,
    });
    await signOut();
  } catch (e) {
    console.log(e);
  }
};
