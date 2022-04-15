import React from 'react';
import s from '../index.module.scss';
import {Event} from '~/@types/timing';
import {getCardColor} from '~/src/util';
import {Tooltip} from 'antd';

export default function ({item}: {item: Event}) {
  return (
    <div className={s.card} style={getCardColor(item)}>
      <div className={s.nameBox}>{item.name}</div>
      <div className={s.btnBar}>
        <Tooltip overlay="开始计时" placement="bottom">
          <i className="iconfont icon-yunhang"></i>
        </Tooltip>
        <Tooltip overlay="编辑" placement="bottom">
          <i className="iconfont icon-bianji"></i>
        </Tooltip>
        <Tooltip overlay="删除" placement="bottom">
          <i className="iconfont icon-shanchu"></i>
        </Tooltip>
      </div>
    </div>
  );
}
