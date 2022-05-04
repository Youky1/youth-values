import React, {useEffect, useState} from 'react';
import s from './index.module.scss';
import {getGroupList} from '@/api/group';
import {GroupItem} from '~/@types/group';
import {useAutoLogin} from '@/hooks/user';
import Mine from './mine';
import Joined from './joined';
import Other from './other';
import AddGroup from './addGroup';

export default function Group() {
  const {id} = useAutoLogin('group');
  const [myGroups, setMyGroups] = useState<GroupItem[]>();
  const [joinedGroup, setJoinedGroup] = useState<GroupItem[]>();
  const [groups, setGroups] = useState<GroupItem[]>();
  const refreshData = () => {
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
    refreshData();
  }, [id]);

  return (
    <div className={s.container}>
      <Mine refreshData={refreshData} myGroups={myGroups} />
      <Joined refreshData={refreshData} joinedGroup={joinedGroup} />
      <Other refreshData={refreshData} otherGroup={groups} userId={id} />
      <AddGroup id={id} refreshData={refreshData} />
    </div>
  );
}
