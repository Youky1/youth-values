import React, {useRef, useState} from 'react';
import columns from '@/constants/constants';
import {Button, Modal, Table, Input} from 'antd';
import {removeGroup, updateDescription} from '@/api/group';
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
  const [isUpdate, setIsUpdate] = useState(false);
  const [newDescription, setNewDescription] = useState('');
  const currentId = useRef('');

  // 修改小组描述
  const handleChangeDescription = (id: string, description: string) => {
    setIsUpdate(true);
    setNewDescription(description);
    currentId.current = id;
  };
  const emitUpdateDescription = async () => {
    if (!newDescription) {
      failTip('小组描述不能为空');
      return;
    }
    try {
      await updateDescription(currentId.current, newDescription);
      await refreshData();
      successTip('修改成功');
    } catch (e) {
      failTip(e);
    }
    setIsUpdate(false);
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
      render: (description: string, record: GroupItem) => (
        <a onClick={() => handleChangeDescription(record.id, description)}>
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
      <Modal
        title="修改描述"
        visible={isUpdate}
        onCancel={() => setIsUpdate(false)}
        onOk={emitUpdateDescription}
      >
        <Input
          value={newDescription}
          onChange={e => setNewDescription(e.target.value)}
        />
      </Modal>
    </>
  );
}
