import React from 'react';
import columns from '@/constants/constants';
import {Button, Table, Modal} from 'antd';
import Title from '@/component/title';
import {GroupItem} from '~/@types/group';
import {quitGroup} from '@/api/group';
import {failTip, successTip} from '~/src/util';
export default function Joined({
  userId,
  refreshData,
  joinedGroup,
}: {
  userId: string;
  refreshData: Function;
  joinedGroup: GroupItem[] | undefined;
}) {
  const handleQuit = (id: string) => {
    Modal.confirm({
      title: '确认要退出吗',
      async onOk() {
        try {
          await quitGroup(id, userId);
          await refreshData();
          successTip('退出成功');
        } catch (e) {
          console.log(e);
          failTip(e);
        }
      },
    });
  };
  const joinedColumns = [
    ...columns,
    {
      title: '小组描述',
      dataIndex: 'description',
    },
    {
      title: '操作',
      dataIndex: 'id',
      render: (id: string) => (
        <Button type="primary" shape="round" onClick={() => handleQuit(id)}>
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
