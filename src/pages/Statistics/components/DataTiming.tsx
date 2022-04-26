import React, {useEffect} from 'react';
import s from './index.module.scss';
import Title from '@/component/title';
import {useRange} from '@/hooks/statistics';
import {createChart, sortTimingData, createChartHorizontal} from '@/util';
import {useTimingRecordByName, useTimingRecordByDate} from '@/hooks/timing';

export default function () {
  const {start, end, abscissa, type} = useRange();
  const recordsByName = useTimingRecordByName(start, end);
  const {timesList, durationList} = useTimingRecordByDate(
    abscissa,
    type === 'days' ? 'MM-DD' : 'YYYY-MMM'
  );

  // 专注时长
  useEffect(() => {
    createChart(
      '专注时长统计',
      abscissa,
      durationList,
      'chart_timing_len',
      'line',
      {
        color: '#9A9F77',
        yAxis: {
          name: '分钟',
        },
      }
    );
  }, [start, end]);

  // 专注时长排行
  useEffect(() => {
    const {xData, yData} = sortTimingData(recordsByName, 'duration');
    createChartHorizontal(
      '专注时长排行',
      yData.map(item => ({...item, value: item.value / 60})),
      xData,
      'chart_timing_len_rank',
      'bar',
      {
        xAxis: {
          name: '分钟',
        },
      }
    );
  }, [start, end]);

  // 专注次数
  useEffect(() => {
    createChart(
      '专注次数统计',
      abscissa,
      timesList,
      'chart_timing_count',
      'line',
      {
        color: '#9BC4CA',
      }
    );
  }, [start, end]);

  // 专注次数排行
  useEffect(() => {
    const {xData, yData} = sortTimingData(recordsByName, 'times');
    createChartHorizontal(
      '专注次数排行',
      yData,
      xData,
      'chart_timing_count_rank',
      'bar'
    );
  }, [start, end]);

  return (
    <div className={s.chatPart}>
      <Title>专注计时数据</Title>
      <div className={s.line}>
        <div id="chart_timing_len" className={s.chartContent}></div>
        <div id="chart_timing_len_rank" className={s.chartContent}></div>
      </div>
      <div className={s.line}>
        <div id="chart_timing_count" className={s.chartContent}></div>
        <div id="chart_timing_count_rank" className={s.chartContent}></div>
      </div>
    </div>
  );
}
