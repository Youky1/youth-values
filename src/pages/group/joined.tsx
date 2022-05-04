import React from 'react';
import columns from '@/constants/constants';
import {Button, Table} from 'antd';
import Title from '@/component/title';
import {GroupItem} from '~/@types/group';
export default function Joined({
  refreshData,
  joinedGroup,
}: {
  refreshData: Function;
  joinedGroup: GroupItem[] | undefined;
}) {
  const joinedColumns = [
    ...columns,
    {
      title: '小组描述',
      dataIndex: 'description',
    },
    {
      title: '操作',
      render: () => (
        <Button type="primary" shape="round">
          退出小组
        </Button>
      ),
    },
  ];
  return (
    <>
      <Title>我加入的小组</Title>
      <Table
        dataSource={joinedGroup}
        columns={joinedColumns}
        pagination={false}
      />
    </>
  );
}
