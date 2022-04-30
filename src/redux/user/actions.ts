import {UserInfo} from '~/@types/user';
import Con from './constants';

export const setUserInfoAction = (payload: UserInfo) => ({
  type: Con.SET_USER_INFO,
  payload,
});
