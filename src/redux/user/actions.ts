import {UserInfo} from '~/@types/user';
import Con from './constants';
import {changePassword, removeUser} from '@/api/user';
import {failTip, successTip} from '~/src/util';
import {Dispatch} from 'redux';

export const setUserInfoAction = (payload: UserInfo) => ({
  type: Con.SET_USER_INFO,
  payload,
});

export const changePwdAction = (pwd: string) => async (dispatch: Dispatch) => {
  try {
    await changePassword(pwd);
    dispatch({
      type: Con.CHANGE_PASSWORD,
      payload: pwd,
    });
    successTip('修改密码成功');
  } catch (e) {
    failTip(e);
  }
};

export const removeUserAction = () => async (dispatch: Dispatch) => {
  try {
    await removeUser();
    dispatch({
      type: Con.REMOVE_USER,
    });
    successTip('注销成功');
  } catch (e) {
    failTip(e);
  }
};
