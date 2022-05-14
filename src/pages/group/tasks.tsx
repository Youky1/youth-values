import React, {useEffect, useState} from 'react';
import {Tooltip, Button, Table, Tag} from 'antd';
import {failTip, successTip} from '~/src/util';
import {finishTask} from '~/src/api/group';
import {Task} from '~/@types/group';
import {addTodoItem} from '@/api/todolist';
import s from './index.module.scss';
import {getTaskRecord} from '@/api/group';

export default function ({
  groupId,
  task,
  refreshTask,
  userId,
}: {
  groupId: string;
  task: Task[];
  refreshTask: Function;
  userId: string;
}) {
  // 完成任务
  const handleComplete = async (taskId: string) => {
    try {
      await finishTask(groupId, taskId, userId);
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

  // 任务数据统计用到的数据
  const [early, setEarly] = useState({user: '', time: ''});
  const [late, setLate] = useState({user: '', time: ''});
  useEffect(() => {
    getTaskRecord(groupId).then(res => {
      setEarly(res.early);
      setLate(res.late);
    });
  }, [groupId, userId]);

  return (
    <>
      <Table dataSource={task} columns={taskColumns} pagination={false} />
      {/* 任务数据统计 */}
      <div className={s.line}>
        最早工作时间：<Tag color="blue">{early.time}时</Tag>，保持者：
        <Tag color="blue">{early.user}</Tag>
      </div>
      <div className={s.line}>
        最晚工作时间：<Tag color="volcano">{late.time}时</Tag>，保持者：
        <Tag color="volcano">{late.user}</Tag>
      </div>
    </>
  );
}
