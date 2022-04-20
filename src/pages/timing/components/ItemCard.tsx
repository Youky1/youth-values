import React, {useState} from 'react';
import s from '../index.module.scss';
import {Event} from '~/@types/timing';
import {failTip, getCardColor} from '~/src/util';
import {Modal, Tooltip, Input} from 'antd';
import {useDispatch} from 'react-redux';
import {
  deleteEventAction,
  editEventAction,
  setCurrentEventAction,
  setIsTimingAction,
} from '@/redux/timing/actions';

export default function ({item}: {item: Event}) {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [inputValue, setInputValue] = useState(item.name);

  // 开始计时
  const handleTimingStart = () => {
    dispatch(setCurrentEventAction(item.name));
    dispatch(setIsTimingAction(true));
  };

  // 编辑事件
  const handleEdit = () => {
    if (item.name === inputValue) {
      failTip('名称未变');
    } else {
      dispatch(editEventAction(item.name, inputValue));
    }
  };

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
          <i
            className="iconfont icon-bianji"
            onClick={() => setIsEdit(true)}
          ></i>
        </Tooltip>
        <Tooltip overlay="删除" placement="bottom">
          <i className="iconfont icon-shanchu" onClick={handleDelete}></i>
        </Tooltip>
      </div>
      <Modal
        visible={isEdit}
        title="编辑事件名称"
        onCancel={() => setIsEdit(false)}
        onOk={handleEdit}
      >
        <Input
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
      </Modal>
    </div>
  );
}
