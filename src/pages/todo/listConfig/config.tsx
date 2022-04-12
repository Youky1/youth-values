import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import s from './index.module.scss';
import Title from '@/component/title';
import {message, Select, Switch} from 'antd';
import {useInitGroups} from '@/hooks/todolist';
import {Input} from 'antd';
import {addGroup, removeGroup} from '@/api/todolist/group';
import {
  setShowDoneAction,
  setShowLevelAction,
  setShowDdlAction,
  setShowGroupAction,
} from '~/src/redux/todolist/actions';
import {failTip} from '~/src/util';

const {Option} = Select;
export default function () {
  const dispatch = useDispatch();

  /*********************分组管理相关*********************/
  // 初始化分组信息
  const groups = useInitGroups();

  // 添加分组
  const [newGroupName, setNewGroupName] = useState('');
  const handleNewGroup = async () => {
    if (newGroupName) {
      await addGroup(newGroupName);
      setNewGroupName('');
    } else {
      failTip('新增分组名不能为空');
    }
  };

  // 删除分组
  const [currentGroup, setCurrentGroup] = useState('');
  const handleDeleteGroup = async () => {
    if (currentGroup) {
      await removeGroup(currentGroup);
      setCurrentGroup('');
    } else {
      failTip('还未选中分组');
    }
  };

  /*********************筛选显示相关*********************/
  // 是否显示已完成事件
  const handleSwitchChange = (checked: boolean) => {
    dispatch(setShowDoneAction(checked));
  };

  // 时间范围
  const handleDdlChange = (ddl: string) => {
    dispatch(setShowDdlAction(ddl));
  };

  // 紧急程度
  const handleLevelChange = (level: string) => {
    dispatch(setShowLevelAction(level));
  };

  // 分组
  const handleGroupChange = (group: string) => {
    dispatch(setShowGroupAction(group));
  };

  return (
    <div>
      <Title>显示筛选</Title>
      <div className="lineContainer">
        <p>是否显示已完成</p>
        <Switch onChange={handleSwitchChange} />
      </div>
      <div className="lineContainer">
        <p>时间范围</p>
        <Select
          defaultValue={'全部'}
          style={{width: 150}}
          onChange={handleDdlChange}
        >
          <Option value="全部">全部</Option>
          <Option value="已过期">已过期</Option>
          <Option value="本周">本周</Option>
          <Option value="本月">本月</Option>
        </Select>
      </div>
      <div className="lineContainer">
        <p>紧急程度</p>
        <Select
          defaultValue={'无'}
          style={{width: 150}}
          onChange={handleLevelChange}
        >
          <Option value="高">高</Option>
          <Option value="中">中</Option>
          <Option value="低">低</Option>
          <Option value="无">无</Option>
          <Option value="全部">全部</Option>
        </Select>
      </div>
      <div className="lineContainer">
        <p>分组</p>
        <Select
          defaultValue={'全部'}
          style={{width: 150}}
          onChange={handleGroupChange}
        >
          <Option value="全部">全部</Option>
          {groups.map(item => (
            <Option value={item} key={item}>
              {item}
            </Option>
          ))}
        </Select>
      </div>

      {/* 分组管理部分 */}
      <Title>分组管理</Title>
      <div className="lineContainer">
        <p>新建分组</p>
        <div className={s.groupContainer}>
          <Input
            value={newGroupName}
            style={{width: 150}}
            onChange={e => setNewGroupName(e.target.value)}
            onPressEnter={handleNewGroup}
          />
          <i
            className={s.btn + ' iconfont icon-jiahao'}
            onClick={handleNewGroup}
          ></i>
        </div>
      </div>
      <div className="lineContainer">
        <p>删除分组</p>
        <div className={s.groupContainer}>
          <Select
            value={currentGroup}
            style={{width: 150}}
            onChange={v => setCurrentGroup(v)}
          >
            {groups.map(item => (
              <Option value={item} key={item}>
                {item}
              </Option>
            ))}
          </Select>
          <i
            className={s.btn + ' iconfont icon-24gf-minusCircle'}
            onClick={handleDeleteGroup}
          ></i>
        </div>
      </div>
    </div>
  );
}
