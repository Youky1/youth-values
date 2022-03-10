import React, {useCallback} from 'react';
import s from './index.module.scss';
import {ITodoItem} from '~/@types/todolist';
import {formatTime} from '@/util/time';
const levels = new Map([
  ['高', '#f56c6c'],
  ['中', '#e6a23c'],
  ['低', '#67c23a'],
  ['无', '#909399'],
]);
export default function Login({
  item,
  callback,
  deleteCallback,
}: {
  item: ITodoItem;
  callback: any;
  deleteCallback?: any;
}) {
  const {level, name, done, ddl} = item;

  const handleClick = () => {
    callback(item);
  };

  const handleDelete = () => {
    console.log('set id', item);
    deleteCallback(item.id);
  };

  return (
    <div className={s.listItem}>
      <div
        className={s.itemStatus}
        style={{backgroundColor: levels.get(level || '无')}}
        onClick={handleDelete}
      ></div>
      <i
        className={
          s.itemBtn + ' iconfont ' + (done ? 'icon-quanduigou' : 'icon-c')
        }
        style={{
          color: done ? '#67c23a' : '#c0c4cc',
        }}
      ></i>
      <span className={s.itemText} onClick={handleClick}>
        {name}
      </span>
      <span className={s.itemDate}>{formatTime(ddl)}</span>
    </div>
  );
}
