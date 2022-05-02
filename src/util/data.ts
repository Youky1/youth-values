/****************处理表格所需数据的封装方法****************/
import {cloneDeep} from 'lodash';
import moment from 'moment';
import {RecordsByName, validRangePickerValue} from '~/@types/statistics';
import {ITodoItems} from '~/@types/todolist';
import {getDateListOfYear, getRangeDays, getRangeMonths} from './time';

// 获取横轴日期数据
export const getDateList = (range: validRangePickerValue) => {
  const duration = range[1]?.diff(range[0], 'days');
  if (duration < 32) {
    return getRangeDays(range[0], range[1]);
  } else {
    return getRangeMonths(range[0], range[1]);
  }
};

// 将数据处理为每日数据的形式
export const todoDataFillterDays = (
  list: ITodoItems,
  abscissa: Array<string>,
  key: 'createDate' | 'doneDate'
) => {
  const res: Array<number> = Array(abscissa.length).fill(0);
  list.forEach(item => {
    const date = item[key];
    if (date) {
      const current = moment(date).format('MM-DD');
      const index = abscissa.indexOf(current);
      if (index >= 0) {
        res[index]++;
      }
    }
  });
  return res;
};

// 将数据处理为每月数据的形式
export const todoDataFillterMonths = (
  list: ITodoItems,
  abscissa: Array<string>,
  key: 'createDate' | 'doneDate'
) => {
  const res: Array<number> = Array(abscissa.length).fill(0);
  list.forEach(item => {
    const date = item[key];
    if (date) {
      const current = moment(date).format('YYYY-MMM');
      const index = abscissa.indexOf(current);
      if (index >= 0) {
        res[index]++;
      }
    }
  });
  return res;
};

// 将计时任务按时长/次数排序
export const sortTimingData = (
  records: RecordsByName,
  type: 'times' | 'duration'
) => {
  const colors = ['#823835', '#8ABEB2', '#C9BAAA', '#DDD38C', '#DE9C52'];
  const arr = cloneDeep(records)
    .sort((pre, next) => next[type] - pre[type])
    .slice(0, 5)
    .filter(item => item[type] !== 0);
  return {
    xData: arr.map(item => item.name),
    yData: arr.map((item, index) => ({
      value: item[type],
      itemStyle: {color: colors[index]},
    })),
  };
};
