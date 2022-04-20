import React, {useState} from 'react';
import s from './index.module.scss';
import {useInitEventList} from '@/hooks/timing';
import AddButton from '@/component/addButton';
import Clock from './components/Clock';
import ItemCard from './components/ItemCard';
import {useSelector} from 'react-redux';
import {RootState} from '~/@types/store';
export default function () {
  const eventList = useInitEventList();
  const currentEvent = useSelector(
    (state: RootState) => state.timing.currentEvent
  );
  console.log('currentEvent: ', currentEvent);
  const [showAdd, setShowAdd] = useState(false);
  const isTiming = useSelector((state: RootState) => state.timing.isTiming);
  return (
    <div className={s.timing}>
      <main>
        {eventList.map(item => (
          <ItemCard key={item.name} item={item}></ItemCard>
        ))}
      </main>
      <AddButton overlay="添加计时事件" callback={() => setShowAdd(true)} />
      {isTiming && <Clock />}
    </div>
  );
}
