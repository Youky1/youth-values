import React, {useState} from 'react';
import s from './index.module.scss';
import Editor from '@/component/editor';
import {Drawer, Tooltip} from 'antd';
import {ITodoItem} from '~/@types/todolist';
import {useDispatch} from 'react-redux';
import {addTodoItemAction} from '~/src/redux/todolist/actions';
import {addTodoItem} from '@/api/todolist';
import {successTip} from '@/util';
import AddButton from '~/src/component/addButton';

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
      <AddButton overlay="添加待办事项" callback={showDrawer} />
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
