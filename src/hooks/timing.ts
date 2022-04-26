import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/@types/store';
import {getEventList} from '@/api/timing';
import {initEventListAction} from '@/redux/timing/actions';
import moment from 'moment';
import {isInRange} from '@/util';

// 初始化并获取Event List
export const useInitEventList = (hideDone: boolean) => {
  const dispatch = useDispatch();
  useEffect(() => {
    getEventList()
      .then(res => {
        dispatch(initEventListAction(res));
      })
      .catch(err => console.log(err));
  }, []);
  return useSelector((state: RootState) =>
    hideDone
      ? state.timing.eventList.filter(item => !item.isDone)
      : state.timing.eventList
  );
};

// 获取时间范围内各个事件的总计时时间和次数
export const useTimingRecordByName = (
  start: moment.Moment,
  end: moment.Moment
) => {
  const list = useInitEventList(false);
  return list.map(item => {
    let duration = 0;
    for (const rec of item.record) {
      if (isInRange(start, end, rec.start)) {
        duration += rec.length;
      }
    }
    return {
      name: item.name,
      duration,
      times: item.record.length,
    };
  });
};

// 获取时间范围内每天的工作时长（单位为秒）
export const useTimingRecordByDate = (
  abscissa: string[],
  type: 'MM-DD' | 'YYYY-MMM'
) => {
  const list = useInitEventList(false);
  const timesList: number[] = Array(abscissa.length).fill(0);
  const durationList: number[] = Array(abscissa.length).fill(0);
  for (const item of list) {
    for (const rec of item.record) {
      const index = abscissa.indexOf(moment(rec.start).format(type));
      if (index >= 0) {
        durationList[index] += rec.length / 60;
        timesList[index]++;
      }
    }
  }
  return {timesList, durationList};
};
