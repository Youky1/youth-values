import React, {useEffect, useRef, useState} from 'react';
import columns from '@/constants/constants';
import {Button, Modal, Table, Input, Drawer} from 'antd';
import {
  removeGroup,
  updateDescription,
  addUser,
  queryTaskByGroup,
  addTask,
} from '@/api/group';
import {successTip, failTip} from '@/util';
import Title from '@/component/title';
import {GroupItem, Task} from '~/@types/group';
import Tasks from './tasks';

export default function Mine({
  refreshData,
  myGroups,
}: {
  refreshData: Function;
  myGroups: GroupItem[] | undefined;
}) {
  const currentId = useRef('');

  // 修改小组描述
  const [isUpdate, setIsUpdate] = useState(false);
  const [newDescription, setNewDescription] = useState('');
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

  // 添加组员
  const [newUserId, setNewUserId] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const handleAddUser = async () => {
    if (!newUserId) {
      failTip('新成员ID不能为空');
      return;
    }
    try {
      await addUser(currentId.current, newUserId);
      await refreshData();
      successTip('邀请成功');
    } catch (e) {
      failTip(e);
    }
    setIsAdding(false);
  };

  // 小组任务
  const [showTask, setShowTask] = useState(false);
  const [task, setTask] = useState<Task[]>([]);
  const refreshTask = async () => {
    const res = await queryTaskByGroup(currentId.current);
    setTask(res);
  };
  useEffect(() => {
    if (showTask) {
      refreshTask();
    }
  }, [showTask]);

  // 新建任务
  const [newTask, setNewTask] = useState('');
  const handleAddTask = async (e: any) => {
    try {
      const {value} = e.target;
      await addTask(currentId.current, value);
      successTip('添加成功');
    } catch (e) {
      failTip('添加失败: ' + e);
      console.log(e);
    }
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
          <Button
            type="primary"
            shape="round"
            style={{marginRight: 20}}
            onClick={() => {
              setIsAdding(true);
              currentId.current = id;
            }}
          >
            邀请成员
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

      <Modal
        title="添加组员"
        visible={isAdding}
        onCancel={() => setIsAdding(false)}
        onOk={handleAddUser}
      >
        <Input value={newUserId} onChange={e => setNewUserId(e.target.value)} />
      </Modal>

      <Drawer
        title="小组任务"
        visible={showTask}
        onClose={() => setShowTask(false)}
        width={1000}
      >
        <div className="lineContainer">
          <p>新建任务</p>
          <Input
            placeholder="按回车添加"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            onPressEnter={handleAddTask}
          />
        </div>
        <Tasks
          groupId={currentId.current}
          task={task}
          refreshTask={refreshTask}
        />
      </Drawer>
    </>
  );
}
