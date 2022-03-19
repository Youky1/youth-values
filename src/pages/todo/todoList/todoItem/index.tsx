import React, {useState} from 'react';
import s from './index.module.scss';
import {ITodoItem} from '~/@types/todolist';
import {formatTime} from '@/util/time';
import {toggleTodoItemAction} from '@/store/todolist/actions';
import {useDispatch} from 'react-redux';
import {deleteTodoItemAction} from '@/store/todolist/actions';
import {Modal} from 'antd';
import {successTip, failTip} from '@/util';

const levels = new Map([
  ['高', '#f56c6c'],
  ['中', '#e6a23c'],
  ['低', '#67c23a'],
  ['无', '#909399'],
]);
export default function Login({
  item,
  callback,
}: {
  item: ITodoItem;
  callback: any;
}) {
  const {level, name, done, ddl} = item;

  const handleClick = () => {
    callback(item);
  };

  // 更改事项状态
  const dispatch = useDispatch();
  const toggleItem = () => {
    dispatch(toggleTodoItemAction(item.id as number));
  };

  // 控制弹窗的变量
  const [showModal, setShowModal] = useState(false);
  const handleCancel = () => {
    setShowModal(false);
  };

  // 删除事项
  const handleDelete = async () => {
    try {
      dispatch(deleteTodoItemAction(item.id as number));
      handleCancel();
      successTip('删除成功');
    } catch (e) {
      failTip(String(e));
    }
  };

  return (
    <div className={s.listItem}>
      <div
        className={s.itemStatus}
        style={{backgroundColor: levels.get(level || '无')}}
        onClick={() => setShowModal(true)}
      ></div>
      <i
        onClick={toggleItem}
        className={
          s.itemBtn + ' iconfont ' + (done ? 'icon-quanduigou' : 'icon-c')
        }
        style={{
          color: done ? '#67c23a' : '#ddd',
        }}
      ></i>
      <span
        className={s.itemText + (done ? ' ' + s.doneText : '')}
        onClick={handleClick}
      >
        {name}
      </span>
      <span className={s.itemDate}>{formatTime(ddl)}</span>
      <Modal
        title="确认要删除该事项吗？"
        visible={showModal}
        onCancel={handleCancel}
        onOk={handleDelete}
      />
    </div>
  );
}
