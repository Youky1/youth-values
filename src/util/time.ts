import moment from 'moment';
import {ITodoItems} from '~/@types/todolist';
import {NamedList} from '~/@types/store';

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
    if (ddl) {
      const weekStart = moment().weekday(1); //本周一
      const weekEnd = moment().weekday(7); //本周日
      const monthStart = moment().month(moment().month()).startOf('month');
      const monthEnd = moment().month(moment().month()).endOf('month');
      const d = moment(ddl);
      if (d.isBefore(moment())) {
        res[0].list.push(item);
      } else if (d.isBefore(weekEnd) && d.isAfter(weekStart)) {
        res[1].list.push(item);
      } else if (d.isBefore(monthEnd) && d.isAfter(monthStart)) {
        res[2].list.push(item);
      } else {
        res[3].list.push(item);
      }
    } else {
      res[3].list.push(item);
    }
  });
  return res;
};
