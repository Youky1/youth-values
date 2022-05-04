import React from 'react';
import columns from '@/constants/constants';
import {Button, Modal, Table} from 'antd';
import {removeGroup} from '@/api/group';
import {successTip, failTip} from '@/util';
import Title from '@/component/title';
import {GroupItem} from '~/@types/group';

export default function Mine({
  refreshData,
  myGroups,
}: {
  refreshData: Function;
  myGroups: GroupItem[] | undefined;
}) {
  // 修改小组描述
  const handleChangeDescription = (description: string) => {
    alert(description);
  };

  // 删除小组
  const handleRemoveGroup = (id: string) => {
    Modal.confirm({
      title: '确认要删除吗',
      async onOk() {
        try {
          await removeGroup(id);
          successTip('解散成功');
          await refreshData();
        } catch (e) {
          failTip(e);
        }
      },
    });
  };
  const myColumns = [
    ...columns,
    {
      title: '小组描述',
      dataIndex: 'description',
      key: 'id',
      render: (description: string) => (
        <a onClick={() => handleChangeDescription(description)}>
          {description}
        </a>
      ),
    },
    {
      title: '操作',
      dataIndex: 'id',
      render: (id: string) => (
        <>
          <Button
            type="primary"
            shape="round"
            style={{marginRight: 20}}
            onClick={() => handleRemoveGroup(id)}
          >
            解散小组
          </Button>
          <Button type="primary" shape="round">
            邀请成员
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Title>我的小组</Title>
      <Table dataSource={myGroups} columns={myColumns} pagination={false} />
    </>
  );
}
