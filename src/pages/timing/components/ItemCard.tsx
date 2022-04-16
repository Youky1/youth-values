import React from 'react';
import s from '../index.module.scss';
import {Event} from '~/@types/timing';
import {getCardColor} from '~/src/util';
import {Tooltip} from 'antd';
import {useDispatch} from 'react-redux';
import {deleteEventAction} from '@/redux/timing/actions';

export default function ({item}: {item: Event}) {
  const dispatch = useDispatch();

  // 开始计时
  const handleTimingStart = () => {};

  // 编辑事件
  const handleEdit = () => {};

  // 删除事件
  const handleDelete = () => {
    dispatch(deleteEventAction(item.name));
  };

  return (
    <div className={s.card} style={getCardColor(item)}>
      <div className={s.nameBox}>{item.name}</div>
      <div className={s.btnBar}>
        <Tooltip overlay="开始计时" placement="bottom">
          <i className="iconfont icon-yunhang" onClick={handleTimingStart}></i>
        </Tooltip>
        <Tooltip overlay="编辑" placement="bottom">
          <i className="iconfont icon-bianji" onClick={handleEdit}></i>
        </Tooltip>
        <Tooltip overlay="删除" placement="bottom">
          <i className="iconfont icon-shanchu" onClick={handleDelete}></i>
        </Tooltip>
      </div>
    </div>
  );
}
