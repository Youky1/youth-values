import {autoLogin} from '@/api/user';
import {useEffect} from 'react';
import {useNavigate} from 'react-router';
import {failTip} from '../util';

// 利用储存信息自动登录，登录失败时跳转至登录页面
export const useAutoLogin = (from: string) => {
  const nav = useNavigate();
  useEffect(() => {
    autoLogin()
      .then(res => {
        console.log('已自动登录:', res);
      })
      .catch(() => {
        console.log('自动登录失败');
        nav(`/login?from=${from}`);
        failTip('登录信息失效，已跳转至登录页面');
      });
  }, []);
};
