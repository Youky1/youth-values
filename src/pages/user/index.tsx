import React from 'react';
import s from './index.module.scss';
import {useAutoLogin} from '@/hooks/user';
export default function User() {
  useAutoLogin('user');
  return <div>123</div>;
}
