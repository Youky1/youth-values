import React, {useState} from 'react';
import s from './index.module.scss';
import {useInitEventList} from '@/hooks/timing';
import AddButton from '@/component/addButton';
import Clock from './components/Clock';
import ItemCard from './components/ItemCard';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/@types/store';
import {Modal, Input} from 'antd';
import {addEventAction} from '@/redux/timing/actions';
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
  return (
    <div className={s.timing}>
      <main>
        {eventList.map(item => (
          <ItemCard key={item.name} item={item}></ItemCard>
        ))}
      </main>
      <AddButton overlay="添加计时事件" callback={() => setShowAdd(true)} />
      {isTiming && <Clock />}
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
    </div>
  );
}
