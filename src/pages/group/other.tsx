import React from 'react';
import columns from '@/constants/constants';
import {Button, Table} from 'antd';
import Title from '@/component/title';
import {GroupItem} from '~/@types/group';
import {addUser} from '@/api/group';
import {successTip, failTip} from '@/util';

export default function Joined({
  userId,
  refreshData,
  otherGroup,
}: {
  userId: string;
  refreshData: Function;
  otherGroup: GroupItem[] | undefined;
}) {
  const handleJoin = async (id: string) => {
    try {
      await addUser(id, userId);
      await refreshData();
      successTip('加入成功');
    } catch (e) {
      failTip(e);
    }
  };
  const otherColumns = [
    ...columns,
    {
      title: '小组描述',
      dataIndex: 'description',
    },
    {
      title: '操作',
      dataIndex: 'id',
      render: (id: string) => (
        <Button type="primary" shape="round" onClick={() => handleJoin(id)}>
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
