import React, {useEffect, useState} from 'react';
import s from './index.module.scss';
import {getGroupList, addGroup} from '@/api/group';
import {GroupItem} from '~/@types/group';
import {useAutoLogin} from '@/hooks/user';
import Title from '@/component/title';
import {Table, Button, Tag} from 'antd';

export default function Group() {
  const {id} = useAutoLogin('group');
  console.log('id is: ', id);
  const [myGroups, setMyGroups] = useState<GroupItem[]>();
  const [joinedGroup, setJoinedGroup] = useState<GroupItem[]>();
  const [groups, setGroups] = useState<GroupItem[]>();
  console.log(groups);
  useEffect(() => {
    getGroupList()
      .then(res => {
        const mine = [];
        const joined = [];
        const notMine = [];
        for (const item of res) {
          if (item.owner === id) {
            mine.push(item);
          } else if (item.users.includes(id)) {
            joined.push(item);
          } else {
            notMine.push(item);
          }
        }
        setMyGroups(mine);
        setJoinedGroup(joined);
        setGroups(notMine);
      })
      .catch(e => console.log('err: ', e));
  }, [id]);

  const handleChangeDescription = (description: string) => {
    alert(description);
  };

  const columns = [
    {
      title: '组名',
      dataIndex: 'id',
      key: 'id',
    },
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
      title: '组长',
      dataIndex: 'owner',
      key: 'id',
    },
    {
      title: '小组成员',
      dataIndex: 'users',
      key: 'id',
      render: (users: string[]) => (
        <>
          {users.map(item => (
            <Tag color="blue">{item}</Tag>
          ))}
        </>
      ),
    },
    {
      title: '创建日期',
      dataIndex: 'createDate',
      key: 'id',
    },
  ];

  const myColumns = [
    ...columns,
    {
      title: '操作',
      render: () => (
        <>
          <Button type="primary" shape="round" style={{marginRight: 20}}>
            解散小组
          </Button>
          <Button type="primary" shape="round">
            邀请成员
          </Button>
        </>
      ),
    },
  ];

  const joinedColumns = [
    ...columns,
    {
      title: '操作',
      render: () => (
        <Button type="primary" shape="round">
          退出小组
        </Button>
      ),
    },
  ];

  const otherColumns = [
    ...columns,
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
    <div className={s.container}>
      <Title>我的小组</Title>
      <Table dataSource={myGroups} columns={myColumns} pagination={false} />

      <Title>我加入的小组</Title>
      <Table
        dataSource={joinedGroup}
        columns={joinedColumns}
        pagination={false}
      />

      <Title>其他小组</Title>
      <Table dataSource={groups} columns={otherColumns} pagination={false} />

      {/* 创建小组 */}
    </div>
  );
}
