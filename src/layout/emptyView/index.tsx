import React from 'react';
import {Empty} from 'antd';
import s from './index.module.scss';
export default function ({visiable}: {visiable: boolean}) {
  return visiable ? <Empty className={s.empty} /> : <></>;
}
