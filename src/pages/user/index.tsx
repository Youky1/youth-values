import React, {useEffect, useState} from 'react';
import s from './index.module.scss';
import {useAutoLogin} from '@/hooks/user';
export default function User() {
  const {id, password} = useAutoLogin('user');
  return <div>{id}</div>;
}
