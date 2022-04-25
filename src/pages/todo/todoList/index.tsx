import React, {useCallback, useState} from 'react';
import s from './index.module.scss';
import TodoItem from './todoItem';
import Input from '~/src/component/input';
import {useInitTodoList} from '@/hooks/todolist';
import {Drawer} from 'antd';
import Editor from '~/src/component/editor';
import {ITodoItem} from '~/@types/todolist';
import {updateTodoItem} from '@/api/todolist';
import {
  updateTodoItemAction,
  searchItemAction,
} from '~/src/redux/todolist/actions';
import {useDispatch} from 'react-redux';
import {successTip, failTip} from '@/util';
import Title from '@/component/title';
import EmptyView from '@/layout/emptyView';
import {NamedList} from '~/@types/store';

export default function TodoList() {
  const dispatch = useDispatch();
  // 初始化待办事项列表，分为title和list
  const todoList = useInitTodoList({sort: true, hideDone: true});

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

  return (
    <div id={s.list}>
      <Input
        icon="icon-sousuo"
        callback={handleInput}
        tip="搜索成功"
        allowEmpty
        placeholder="输入代办名称进行搜索"
      />
      {(todoList as NamedList[]).map(i =>
        i.list.length ? (
          <React.Fragment key={i.title}>
            <Title>{i.title}</Title>
            <div className={s.listItem}>
              {i.list.map(item => (
                <TodoItem item={item} key={item.id} callback={handleClick} />
              ))}
            </div>
          </React.Fragment>
        ) : null
      )}
      <EmptyView
        visiable={(todoList as NamedList[]).every(i => i.list.length === 0)}
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
