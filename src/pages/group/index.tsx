import React, {useEffect, useState} from 'react';
import s from './index.module.scss';
import {getGroupList, addGroup} from '@/api/group';
import {GroupItem} from '~/@types/group';
import {useAutoLogin} from '@/hooks/user';
import Title from '@/component/title';
import {Table, Button, Tag, Drawer, Input} from 'antd';
import AddButton from '~/src/component/addButton';
import {failTip, successTip} from '~/src/util';

const {TextArea} = Input;

export default function Group() {
  const {id} = useAutoLogin('group');
  console.log('id is: ', id);
  const [myGroups, setMyGroups] = useState<GroupItem[]>();
  const [joinedGroup, setJoinedGroup] = useState<GroupItem[]>();
  const [groups, setGroups] = useState<GroupItem[]>();
  const freshData = () => {
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
  };
  useEffect(() => {
    freshData();
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

  const [isAdding, setIsAdding] = useState(false);
  const [newId, setNewId] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const handleAddGroup = async () => {
    if (!newId || !newDescription) {
      failTip('小组名或描述不能为空');
      return;
    }
    try {
      await addGroup({id: newId, description: newDescription, owner: id});
      setIsAdding(false);
      successTip('添加成功');
      await freshData();
    } catch (e) {
      failTip(e);
    }
  };

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
      <AddButton overlay="新建小组" callback={() => setIsAdding(true)} />
      <Drawer
        visible={isAdding}
        title="创建小组"
        onClose={() => setIsAdding(false)}
        width={640}
      >
        <div className="lineContainer">
          <span>小组名称</span>
          <Input value={newId} onChange={e => setNewId(e.target.value)} />
        </div>
        <div className="lineContainer" style={{height: 'auto', padding: 20}}>
          <span>小组描述</span>
          <TextArea
            rows={4}
            value={newDescription}
            onChange={e => setNewDescription(e.target.value)}
          ></TextArea>
        </div>
        <Button
          onClick={handleAddGroup}
          size="large"
          type="primary"
          shape="round"
          style={{
            marginTop: 40,
            marginLeft: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          确定添加
        </Button>
      </Drawer>
    </div>
  );
}
