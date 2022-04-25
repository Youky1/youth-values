import {useSelector} from 'react-redux';
import {RootState} from '~/@types/store';
import {getDateList} from '@/util';

// 返回选中的时间范围
export const useRange = () => {
  const {showingRange} = useSelector((state: RootState) => state.statistics);
  return {
    start: showingRange[0],
    end: showingRange[1],
    abscissa: getDateList(showingRange),
    type:
      showingRange[1]?.diff(showingRange[0], 'days') < 32 ? 'days' : 'months',
  };
};
