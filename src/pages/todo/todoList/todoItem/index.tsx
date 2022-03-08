import React, {useCallback} from 'react';
import s from './index.module.scss';
import {ITodoItem} from '~/@types/todolist';
import {useNavigate} from 'react-router';
import moment from 'moment';
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
  return (
    <div className={s.listItem} onClick={() => callback(item)}>
      <div
        className={s.itemStatus}
        style={{backgroundColor: levels.get(level || '无')}}
      ></div>
      <i
        className={
          s.itemBtn + ' iconfont ' + (done ? 'icon-quanduigou' : 'icon-c')
        }
        style={{
          color: done ? '#67c23a' : '#c0c4cc',
        }}
      ></i>
      <span className={s.itemText}>{name}</span>
      <span className={s.itemDate}>{moment(ddl).format('YY-MM-DD')}</span>
    </div>
  );
}
