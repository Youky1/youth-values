import React, {useState} from 'react';
import s from './index.module.scss';
import {Tabs, Input, Button} from 'antd';
import {failTip, successTip} from '~/src/util';
import {login, signup} from '@/api/user';
import {useNavigate} from 'react-router';
import {useSearchParams} from 'react-router-dom';

const {TabPane} = Tabs;

export default function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [key, setKey] = useState('登录');

  const nav = useNavigate();
  const [query] = useSearchParams();
  const handleClick = async () => {
    if (!id || !password) {
      failTip('ID或密码不能为空');
      return;
    }
    try {
      if (key === '登录') {
        await login(id, password);
        nav(`/${query.get('from')}`);
      } else {
        await signup(id, password);
      }
      successTip(`${key}成功`);
    } catch (e) {
      failTip(String(e));
    }
  };
  return (
    <div className={s.container}>
      <Tabs defaultActiveKey="登录" centered onChange={key => setKey(key)}>
        <TabPane tab="登录" key="登录"></TabPane>
        <TabPane tab="注册" key="注册"></TabPane>
      </Tabs>
      <Input
        style={{marginTop: 40, width: 300}}
        value={id}
        onChange={e => setId(e.target.value)}
        placeholder="请输入用户名"
      />
      <Input
        style={{marginTop: 40, width: 300}}
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="请输入密码"
      />
      <Button
        style={{marginTop: 40, width: 200}}
        shape="round"
        size="large"
        onClick={handleClick}
      >
        {key}
      </Button>
    </div>
  );
}
