import {autoLogin} from '@/api/user';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {setUserInfoAction} from '@/redux/user/actions';
import {failTip} from '../util';
import {RootState} from '~/@types/store';

// 利用储存信息自动登录，登录失败时跳转至登录页面
export const useAutoLogin = (from: string) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    autoLogin()
      .then(res => {
        dispatch(setUserInfoAction(res));
      })
      .catch(() => {
        console.log('自动登录失败');
        nav(`/login?from=${from}`);
        failTip('登录信息失效，已跳转至登录页面');
      });
  }, []);
  return useSelector((state: RootState) => state.user);
};
