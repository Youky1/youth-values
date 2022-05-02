import React, {useEffect, useState} from 'react';
import s from './index.module.scss';
import {useAutoLogin} from '@/hooks/user';
import {getDateListOfYear, createHeatMap} from '@/util';
import {useTimingRecordByDate} from '@/hooks/timing';
import {Button, Input, Modal} from 'antd';
import {signOut} from '@/api/user';
import {useDispatch} from 'react-redux';
import {changePwdAction, removeUserAction} from '@/redux/user/actions';

const {confirm} = Modal;
const currentYearDateList = getDateListOfYear();

export default function User() {
  const {durationList} = useTimingRecordByDate(
    currentYearDateList,
    'YYYY-MM-DD'
  );
  useEffect(() => {
    createHeatMap(
      'map',
      durationList.map((item, index) => [
        currentYearDateList[index],
        item / 3600,
      ])
    );
  });
  const {id} = useAutoLogin('user');
  const [show, setShow] = useState(false);
  const [pwd, setPwd] = useState('');
  const dispatch = useDispatch();
  const handleSignOut = () => {
    confirm({
      title: '确认要退出登录吗？',
      async onOk() {
        await signOut();
      },
    });
  };
  const handleChangePwd = () => {
    dispatch(changePwdAction(pwd));
  };
  const handleDelete = () => {
    confirm({
      title: '确认要注销账号吗？',
      async onOk() {
        dispatch(removeUserAction());
      },
    });
  };

  return (
    <div className={s.userPage}>
      <div className={s.name}>
        <i className="iconfont icon-yonghu"></i>
        {id}
      </div>
      <div id="map" style={{height: 300, width: 1000, marginTop: 40}}></div>
      <div className={s.btnLine}>
        <Button onClick={() => setShow(true)}>修改密码</Button>
        <Button onClick={handleSignOut}>退出登录</Button>
        <Button onClick={handleDelete}>注销账户</Button>
      </div>
      <Modal
        title="修改密码"
        visible={show}
        onCancel={() => setShow(false)}
        onOk={handleChangePwd}
      >
        <Input
          placeholder="请输入新密码"
          value={pwd}
          onChange={e => setPwd(e.target.value)}
        />
      </Modal>
    </div>
  );
}
