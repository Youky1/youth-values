import React, {useEffect, useRef, useState} from 'react';
import columns from '@/constants/constants';
import {Button, Table, Modal, Drawer} from 'antd';
import Title from '@/component/title';
import {GroupItem, Task} from '~/@types/group';
import {queryTaskByGroup, quitGroup} from '@/api/group';
import {failTip, successTip} from '~/src/util';
import Tasks from './tasks';
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

  const [showTask, setShowTask] = useState(false);
  const [task, setTask] = useState<Task[]>([]);
  const currentId = useRef('');
  const refreshTask = async () => {
    const res = await queryTaskByGroup(currentId.current);
    setTask(res);
  };
  useEffect(() => {
    if (showTask) {
      refreshTask();
    }
  }, [showTask]);

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
        <>
          <Button type="primary" shape="round" onClick={() => handleQuit(id)}>
            退出小组
          </Button>
          <Button
            type="primary"
            shape="round"
            onClick={() => {
              setShowTask(true);
              currentId.current = id;
            }}
          >
            小组任务
          </Button>
        </>
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
      <Drawer
        title="小组任务"
        visible={showTask}
        onClose={() => setShowTask(false)}
        width={640}
      >
        <Tasks
          groupId={currentId.current}
          task={task}
          refreshTask={refreshTask}
        />
      </Drawer>
    </>
  );
}
