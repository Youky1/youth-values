import moment from 'moment';
import {ITodoItems, ITodoItem} from '~/@types/todolist';
import {NamedList} from '~/@types/store';

const getTimeRange = () => {
  const weekStart = moment().isoWeekday(1); //本周一
  const weekEnd = moment().isoWeekday(7); //本周日
  const monthStart = moment().month(moment().month()).startOf('month');
  const monthEnd = moment().month(moment().month()).endOf('month');
  return {weekStart, weekEnd, monthStart, monthEnd};
};

export const isBeforeNow = (time: Date) => {
  const d = moment(time).date();
  return time && d < moment().date();
};

export const isThisWeek = (time: Date) => {
  const d = moment(time);
  const {weekStart, weekEnd} = getTimeRange();
  return time && d.isSameOrBefore(weekEnd) && d.isSameOrAfter(weekStart);
};

export const isThisMonth = (time: Date) => {
  const d = moment(time);
  const {monthStart, monthEnd} = getTimeRange();
  console.log(monthStart, monthEnd);
  return time && d.isSameOrBefore(monthEnd) && d.isSameOrAfter(monthStart);
};

export const formatTime = (time: Date) => moment(time).format('YY-MM-DD');

export const sortList = (list: ITodoItems) => {
  const res: Array<NamedList> = [
    {title: '已过期', list: []},
    {title: '本周', list: []},
    {title: '本月', list: []},
    {title: '其他', list: []},
  ];
  list.map(item => {
    const {ddl} = item;
    if (isBeforeNow(ddl)) {
      res[0].list.push(item);
    } else if (isThisWeek(ddl)) {
      res[1].list.push(item);
    } else if (isThisMonth(ddl)) {
      res[2].list.push(item);
    } else {
      res[3].list.push(item);
    }
  });
  return res;
};

export const timeFillter = (item: ITodoItem, target: string) => {
  const {ddl} = item;
  switch (target) {
    case '全部': {
      return true;
    }
    case '已过期': {
      return isBeforeNow(ddl);
    }
    case '本周': {
      return isThisWeek(ddl);
    }
    case '本月': {
      return isThisMonth(ddl);
    }
    default:
      return true;
  }
};
