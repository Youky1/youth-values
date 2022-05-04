import React from 'react';
import columns from '@/constants/constants';
import {Button, Table} from 'antd';
import Title from '@/component/title';
import {GroupItem} from '~/@types/group';
export default function Joined({
  refreshData,
  otherGroup,
}: {
  refreshData: Function;
  otherGroup: GroupItem[] | undefined;
}) {
  const otherColumns = [
    ...columns,
    {
      title: '小组描述',
      dataIndex: 'description',
    },
    {
      title: '操作',
      render: () => (
        <Button type="primary" shape="round">
          加入小组
        </Button>
      ),
    },
  ];
  return (
    <>
      <Title>其他小组</Title>
      <Table
        dataSource={otherGroup}
        columns={otherColumns}
        pagination={false}
      />
    </>
  );
}
