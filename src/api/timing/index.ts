import localforage from 'localforage';
import {EventList} from '~/@types/timing';
import {getIndex} from '@/util';

export const getEventList = async () => {
  const list = (await localforage.getItem('eventList')) || [];
  return list as EventList;
};
const setEventList = async (list: EventList) =>
  await localforage.setItem('eventList', list);

const isEventExsit = async (name: string) => {
  const list = await getEventList();
  return list.some(item => item.name === name);
};

// 添加事件
export const addEvent = async (name: string) => {
  const list = await getEventList();
  if (await isEventExsit(name)) {
    return Promise.reject('该事件已存在');
  } else {
    list.push({name, record: [], isDone: false});
    return setEventList(list);
  }
};

// 若事件不存在，则添加
export const ensureEvent = async (name: string) => {
  if (!(await isEventExsit(name))) {
    await addEvent(name);
    return false;
  } else {
    const list = await getEventList();
    const i = getIndex(list, name);
    list[i].isDone = false;
    await setEventList(list);
    return true;
  }
};

// 删除事件
export const deleteEvent = async (name: string) => {
  const list = await getEventList();
  const i = getIndex(list, name);
  list.splice(i, 1);
  await setEventList(list);
};

// 编辑事件
export const editEvent = async (oldname: string, newName: string) => {
  const list = await getEventList();
  const i = getIndex(list, oldname);
  list[i].name = newName;
  await setEventList(list);
};

// 添加计时记录
export const addTimingRecord = async (
  name: string,
  start: Date,
  end: Date,
  length: number
) => {
  const eventList = await getEventList();
  const list = await getEventList();
  const i = getIndex(list, name);
  eventList[i].record.push({start, end, length});
  await setEventList(eventList);
};

// 改变事件完成状态
export const toogleEventDone = async (name: string) => {
  const list = await getEventList();
  const i = getIndex(list, name);
  list[i].isDone = !list[i].isDone;
  await setEventList(list);
};
