import React, {useState} from 'react';
import s from './index.module.scss';
import {Tooltip, Drawer} from 'antd';
import Config from './config';

export default function () {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <div>
      <div className={s.icon} onClick={showDrawer}>
        <Tooltip overlay="显示设置">
          <i className="iconfont icon-shezhi"></i>
        </Tooltip>
      </div>
      <Drawer
        title="TODOList显示设置"
        placement="left"
        onClose={onClose}
        visible={visible}
        width={640}
      >
        <Config />
      </Drawer>
    </div>
  );
}
