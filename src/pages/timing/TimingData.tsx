import React, {useEffect, useState} from 'react';
import {getEventList} from '~/src/api/timing';
import {Event} from '~/@types/timing';
import s from './index.module.scss';
import {useNavigate} from 'react-router';
import {useSearchParams} from 'react-router-dom';
import {getDateListForTiming} from '@/util/time';
import {createChart} from '@/util/charts';
import {useCountItem} from '@/hooks/timing';

export default function TimingData() {
  const [searchParams] = useSearchParams();
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  useEffect(() => {
    getEventList().then(list => {
      setCurrentEvent(
        list.filter(item => item.name === searchParams.get('name'))[0]
      );
    });
  }, [searchParams.get('name')]);
  const nav = useNavigate();
  const handleBack = () => {
    nav('/timing');
  };

  const {monthList, yearList} = getDateListForTiming();

  // 过去一个月的专注时间统计
  useEffect(() => {
    const durationList = useCountItem(monthList, 'MM-DD', currentEvent);
    createChart(
      '本月专注情况统计',
      monthList,
      durationList,
      'timing_count_month',
      'line',
      {
        tooltip: {
          trigger: 'none',
        },
        yAxis: {
          name: '分钟',
        },
      }
    );
  });

  // 过去一年每月的专注时间统计
  useEffect(() => {
    const durationList = useCountItem(yearList, 'YYYY-MMM', currentEvent);
    createChart(
      '本年专注情况统计',
      yearList,
      durationList,
      'timing_count_year',
      'line',
      {
        tooltip: {
          trigger: 'none',
        },
        yAxis: {
          name: '分钟',
        },
      }
    );
  });

  return (
    <div className={s.dataPage}>
      <i
        onClick={handleBack}
        className={s.backIcon + ' iconfont icon-fangqi1'}
      ></i>
      <h1>当前事件：{searchParams.get('name')}</h1>
      <div className={s.line}>
        <div id="timing_count_month"></div>
        <div id="timing_count_year"></div>
      </div>
    </div>
  );
}
