import React from 'react';
import s from './index.module.scss';
import TodoList from './todoList';
import AddItem from './addItem';
import ListConfig from './listConfig';

export default function () {
  return (
    <div id={s.todo}>
      <ListConfig />
      <TodoList />
      <AddItem />
    </div>
  );
}
