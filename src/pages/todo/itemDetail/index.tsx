import React, {useState} from 'react';
import {Outlet} from 'react-router';
import s from './index.module.scss';
import Create from './create';
import {Drawer} from 'antd';

export default function () {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <div id={s.detail}>
      <Outlet />
      <div className={s.addIcon} onClick={showDrawer}>
        <i className="iconfont icon-icon-"></i>
      </div>
      <Drawer
        title="新建事项"
        placement="right"
        onClose={onClose}
        visible={visible}
        width={640}
      >
        <Create />
      </Drawer>
    </div>
  );
}
