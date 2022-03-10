import React, {useCallback, useRef, useState} from 'react';
import s from './index.module.scss';
import TodoItem from './todoItem';
import Input from '~/src/component/input';
import {useInitTodoList} from '@/hooks/todolist';
import {Drawer, message, Modal} from 'antd';
import Editor from '~/src/component/editor';
import {ITodoItem} from '~/@types/todolist';
import {updateTodoItem, deleteTodoItem} from '@/api/todolist';
import {
  updateTodoItemAction,
  deleteTodoItemAction,
} from '@/store/todolist/actions';
import {useDispatch} from 'react-redux';
export default function TodoList() {
  // 初始化待办事项列表
  const todoList = useInitTodoList();
  const searchValue = useRef('');
  const handleInput = useCallback((v: string) => (searchValue.current = v), []);

  // 当前在编辑的事项
  const [currentItem, setCurrentItem] = useState<ITodoItem>();

  // Drawer组件所需变量
  const [visible, setVisible] = useState(false);
  const handleClick = (item: ITodoItem) => {
    setVisible(true);
    setCurrentItem(item);
  };
  const onClose = () => {
    setVisible(false);
  };
  const dispatch = useDispatch();
  const handleUpdate = async (obj: ITodoItem) => {
    try {
      await updateTodoItem(obj);
      dispatch(updateTodoItemAction(obj));
      message.success('修改代办事项成功');
    } catch (e) {
      message.error('修改代办事项出错：' + e);
    }
  };

  // 控制弹窗的变量
  const [showModal, setShowModal] = useState(false);
  const currentDeleteId = useRef<number>(-1);
  const handleCancel = () => {
    setShowModal(false);
  };
  const handleShow = (id: number) => {
    currentDeleteId.current = id;
    setShowModal(true);
  };

  // 删除事项
  const handleDelete = async () => {
    try {
      console.log('删除ID：', currentDeleteId.current);
      await deleteTodoItem(currentDeleteId.current);
      dispatch(deleteTodoItemAction(currentDeleteId.current));
      handleCancel();
      message.success('删除成功');
    } catch (e) {
      message.error(String(e));
    }
  };

  return (
    <div id={s.list}>
      <Input icon="icon-sousuo" callback={handleInput} tip="搜索成功" />
      {todoList.map(item => (
        <TodoItem
          item={item}
          key={item.id}
          callback={handleClick}
          deleteCallback={handleShow}
        />
      ))}
      <Modal
        title="确认要删除该事项吗？"
        visible={showModal}
        onCancel={handleCancel}
        onOk={handleDelete}
      />
      <Drawer
        title="新建事项"
        placement="right"
        onClose={onClose}
        visible={visible}
        width={640}
      >
        <Editor callback={handleUpdate} initObj={currentItem} showDetail />
      </Drawer>
    </div>
  );
}
