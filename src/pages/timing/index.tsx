import React, {useState} from 'react';
import s from './index.module.scss';
import {useInitEventList} from '@/hooks/timing';
import AddButton from '@/component/addButton';
import Clock from './components/Clock';
import ItemCard from './components/ItemCard';
import DoneList from './components/DoneList';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/@types/store';
import {Modal, Input, Tooltip, Drawer} from 'antd';
import {addEventAction} from '@/redux/timing/actions';
import EmptyView from '@/layout/emptyView';

export default function () {
  const eventList = useInitEventList();
  const isTiming = useSelector((state: RootState) => state.timing.isTiming);

  const [showAdd, setShowAdd] = useState(false);
  const [newEvent, setNewEvent] = useState('');
  const dispatch = useDispatch();
  const handleAdd = () => {
    dispatch(addEventAction(newEvent));
    setShowAdd(false);
  };

  const [isShowing, setIsShowing] = useState(false);
  const showDrawer = () => setIsShowing(true);
  const hideDrawer = () => setIsShowing(false);
  return (
    <div className={s.timing}>
      {/* 事件列表 */}
      <main>
        {eventList.map(item => (
          <ItemCard key={item.name} item={item}></ItemCard>
        ))}
        <EmptyView visiable={eventList.length === 0} />
      </main>

      {/* 计时器 */}
      {isTiming && <Clock />}

      {/* 右下角按钮 */}
      <AddButton overlay="添加计时事件" callback={() => setShowAdd(true)} />
      <div
        className="mainButton"
        onClick={showDrawer}
        style={{
          right: 100,
          height: 60,
        }}
      >
        <Tooltip overlay="查看已完成事件">
          <i className="iconfont icon-gengduo"></i>
        </Tooltip>
      </div>

      {/* 新建事件 */}
      <Modal
        title="新建计时事件"
        visible={showAdd}
        onCancel={() => setShowAdd(false)}
        onOk={handleAdd}
      >
        <Input
          placeholder="请输入新建事件名"
          value={newEvent}
          onChange={e => setNewEvent(e.target.value)}
        />
      </Modal>

      {/* 查看以完成事件 */}
      <Drawer
        width={640}
        visible={isShowing}
        title="已完成计时事项"
        placement="left"
        onClose={hideDrawer}
      >
        <DoneList />
      </Drawer>
    </div>
  );
}
