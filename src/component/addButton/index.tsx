import {Tooltip} from 'antd';
import React from 'react';
export default function ({
  callback,
  overlay,
}: {
  callback: any;
  overlay: string;
}) {
  return (
    <div
      className={'mainButton'}
      style={{bottom: '15vh', right: 40}}
      onClick={callback}
    >
      <Tooltip overlay={overlay}>
        <i className="iconfont icon-icon-"></i>
      </Tooltip>
    </div>
  );
}
