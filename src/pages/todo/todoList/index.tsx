import React, {useCallback, useRef, useState} from 'react';
import s from './index.module.scss';
import TodoItem from './todoItem';
import Input from '~/src/component/input';
import {useInitTodoList} from '@/hooks/todolist';
import {Drawer, Modal} from 'antd';
import Editor from '~/src/component/editor';
import {ITodoItem} from '~/@types/todolist';
import {updateTodoItem, deleteTodoItem} from '@/api/todolist';
import {
  updateTodoItemAction,
  deleteTodoItemAction,
  searchItemAction,
} from '@/store/todolist/actions';
import {useDispatch} from 'react-redux';
import {successTip, failTip} from '@/util';

export default function TodoList() {
  const dispatch = useDispatch();
  // 初始化待办事项列表
  const todoList = useInitTodoList();

  // 搜索事项回调
  const handleInput = useCallback((v: string) => {
    dispatch(searchItemAction(v));
  }, []);

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
  const handleUpdate = async (obj: ITodoItem) => {
    try {
      await updateTodoItem(obj);
      dispatch(updateTodoItemAction(obj));
      successTip('修改代办事项成功');
    } catch (e) {
      failTip('修改代办事项出错：' + e);
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
      successTip('删除成功');
    } catch (e) {
      failTip(String(e));
    }
  };

  return (
    <div id={s.list}>
      <Input
        icon="icon-sousuo"
        callback={handleInput}
        tip="搜索成功"
        allowEmpty
      />
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
