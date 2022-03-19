import React from 'react';
import s from './index.module.scss';
export default function (props: any) {
  return (
    <div className={s.title}>
      <div className={s.color}></div>
      <div className={s.text}>{props.children}</div>
    </div>
  );
}
