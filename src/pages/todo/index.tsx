import React from 'react';
import s from './index.module.scss';
import TodoList from './todoList';
import ItemDetail from './itemDetail';
export default function Login() {
  return (
    <div id={s.todo}>
      <TodoList></TodoList>
      <ItemDetail></ItemDetail>
    </div>
  );
}
