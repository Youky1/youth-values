import React, {useState} from 'react';
import s from './index.module.scss';
import Editor from '@/component/editor';
import {Drawer} from 'antd';
import {ITodoItem} from '~/@types/todolist';
import {useDispatch} from 'react-redux';
import {addTodoItemAction} from '@/store/todolist/actions';
import {addTodoItem} from '@/api/todolist';
import {message} from 'antd';

export default function () {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const dispatch = useDispatch();
  const handleAdd = async (obj: ITodoItem) => {
    await addTodoItem(obj);
    dispatch(addTodoItemAction(obj));
    message.success('添加代办事项成功');
  };
  return (
    <div id={s.detail}>
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
        <Editor callback={handleAdd} clear />
      </Drawer>
    </div>
  );
}
