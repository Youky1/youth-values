import React from 'react';
import {Tag} from 'antd';
export default [
  {
    title: '组名',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '组长',
    dataIndex: 'owner',
    key: 'id',
  },
  {
    title: '小组成员',
    dataIndex: 'users',
    key: 'id',
    render: (users: string[]) => (
      <>
        {users.map(item => (
          <Tag color="blue">{item}</Tag>
        ))}
      </>
    ),
  },
  {
    title: '创建日期',
    dataIndex: 'createDate',
    key: 'id',
  },
];
