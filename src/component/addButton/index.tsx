import {Tooltip} from 'antd';
import React from 'react';
import s from './index.module.scss';
export default function ({
  callback,
  overlay,
}: {
  callback: any;
  overlay: string;
}) {
  return (
    <div className={s.addIcon} onClick={callback}>
      <Tooltip overlay={overlay}>
        <i className="iconfont icon-icon-"></i>
      </Tooltip>
    </div>
  );
}
