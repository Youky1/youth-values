import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/@types/store';
import {getEventList} from '@/api/timing';
import {initEventListAction} from '@/redux/timing/actions';

// 初始化并获取Event List
export const useInitEventList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getEventList()
      .then(res => {
        dispatch(initEventListAction(res));
      })
      .catch(err => console.log(err));
  }, []);
  return useSelector((state: RootState) => state.timing.eventList);
};
