import React, {useState} from 'react';
import s from './index.module.scss';
import Editor from '@/component/editor';
import {Drawer, Tooltip} from 'antd';
import {ITodoItem} from '~/@types/todolist';
import {useDispatch} from 'react-redux';
import {addTodoItemAction} from '@/store/todolist/actions';
import {addTodoItem} from '@/api/todolist';
import {successTip} from '@/util';

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
    const newItem = await addTodoItem(obj);
    dispatch(addTodoItemAction(newItem));
    successTip('添加代办事项成功');
  };
  return (
    <div id={s.detail}>
      <div className={s.addIcon} onClick={showDrawer}>
        <Tooltip overlay="新建事项">
          <i className="iconfont icon-icon-"></i>
        </Tooltip>
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
