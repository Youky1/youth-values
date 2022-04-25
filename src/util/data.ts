/****************处理表格所需数据的封装方法****************/
import moment from 'moment';
import {validRangePickerValue} from '~/@types/statistics';
import {ITodoItems} from '~/@types/todolist';
import {getRangeDays, getRangeMonths} from './time';

// 获取横轴日期数据
export const getDateList = (range: validRangePickerValue) => {
  const duration = range[1]?.diff(range[0], 'days');
  if (duration < 32) {
    return getRangeDays(range[0], range[1]);
  } else {
    return getRangeMonths(range[0], range[1]);
  }
};

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
