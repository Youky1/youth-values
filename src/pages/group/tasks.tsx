import React from 'react';
import {Tooltip, Button, Table} from 'antd';
import {failTip, successTip} from '~/src/util';
import {finishTask} from '~/src/api/group';
import {Task} from '~/@types/group';
import {addTodoItem} from '@/api/todolist';
export default function ({
  groupId,
  task,
  refreshTask,
}: {
  groupId: string;
  task: Task[];
  refreshTask: Function;
}) {
  // 完成任务
  const handleComplete = async (id: string) => {
    try {
      await finishTask(groupId, id);
      refreshTask();
      successTip('已完成');
    } catch (e) {
      failTip(e);
    }
  };
  // 将任务创建到任务清单
  const handleClone = async (name: string) => {
    const obj = {
      name,
      ddl: null,
      level: '无',
      group: '',
      description: '',
      createDate: new Date(),
      done: false,
    };
    try {
      await addTodoItem(obj);
      successTip('已加入本地待办清单');
    } catch (e) {
      failTip('加入失败：' + e);
    }
  };

  const taskColumns = [
    {
      title: '任务名',
      dataIndex: 'taskId',
      render: (taskId: string) => (
        <Tooltip overlay="点击完成任务">
          <Button type="text" onClick={() => handleComplete(taskId)}>
            {taskId}
          </Button>
        </Tooltip>
      ),
    },
    {title: '发布日期', dataIndex: 'createDate'},
    {title: '成员已完成次数', dataIndex: 'completed'},
    {
      title: '操作',
      dataIndex: 'taskId',
      render: (taskId: string) => (
        <>
          <Button type="primary" onClick={() => handleComplete(taskId)}>
            完成任务
          </Button>
          <Button
            type="primary"
            onClick={() => handleClone(taskId)}
            style={{marginLeft: 20}}
          >
            添加到代办清单
          </Button>
        </>
      ),
    },
  ];
  return <Table dataSource={task} columns={taskColumns} pagination={false} />;
}
