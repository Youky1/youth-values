import React from 'react';
import {Tooltip, Button, Table} from 'antd';
import {failTip, successTip} from '~/src/util';
import {finishTask} from '~/src/api/group';
import {Task} from '~/@types/group';
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
  ];
  return <Table dataSource={task} columns={taskColumns} pagination={false} />;
}
