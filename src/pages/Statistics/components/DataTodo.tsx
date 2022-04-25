import React, {useEffect} from 'react';
import s from './index.module.scss';
import Title from '@/component/title';
import {useInitTodoList} from '@/hooks/todolist';
import {
  createChart,
  todoDataFillterDays,
  todoDataFillterMonths,
  createPieChart,
} from '@/util';
import {useRange} from '@/hooks/statistics';
import {ITodoItems} from '~/@types/todolist';

const levels = ['高', '中', '低', '无'];
export default function () {
  const {start, end, abscissa, type} = useRange();
  const todoList = useInitTodoList({
    sort: false,
    hideDone: false,
  }) as ITodoItems;

  // 创建事件统计
  useEffect(() => {
    const createList =
      type === 'days'
        ? todoDataFillterDays(todoList, abscissa, 'createDate')
        : todoDataFillterMonths(todoList, abscissa, 'createDate');
    createChart(
      '创建事项统计',
      abscissa,
      createList,
      'chart_todo_create',
      'line'
    );
  }, [start, end]);

  // 完成事件统计
  useEffect(() => {
    const doneList =
      type === 'days'
        ? todoDataFillterDays(todoList, abscissa, 'doneDate')
        : todoDataFillterMonths(todoList, abscissa, 'doneDate');
    createChart('完成事项统计', abscissa, doneList, 'chart_todo_done', 'line');
  }, [start, end]);

  // 剩余事件统计
  useEffect(() => {
    const yData = [
      {value: 0, itemStyle: {color: '#f56c6c'}},
      {value: 0, itemStyle: {color: '#e6a23c'}},
      {value: 0, itemStyle: {color: '#67c23a'}},
      {value: 0, itemStyle: {color: '#909399'}},
    ];
    todoList
      .filter(item => !item.done)
      .forEach(item => {
        const index = levels.indexOf(item.level);
        if (index >= 0) {
          yData[index].value++;
        }
      });
    createChart('剩余事件统计', levels, yData, 'chart_todo_left', 'bar');
  });

  // 剩余事件分布情况统计
  useEffect(() => {
    const data = [
      {value: 0, name: '高'},
      {value: 0, name: '中'},
      {value: 0, name: '低'},
      {value: 0, name: '无'},
    ];
    todoList
      .filter(item => !item.done)
      .forEach(item => {
        const index = levels.indexOf(item.level);
        if (index >= 0) {
          data[index].value++;
        }
      });
    createPieChart({
      title: '剩余事件分布情况',
      domId: 'chart_todo_left_percentage',
      data,
    });
  });

  return (
    <div className={s.chatPart}>
      <Title>任务清单数据</Title>
      <div className={s.line}>
        <div id="chart_todo_create" className={s.chartContent}></div>
        <div id="chart_todo_done" className={s.chartContent}></div>
      </div>
      <div className={s.line}>
        <div id="chart_todo_left" className={s.chartContent}></div>
        <div id="chart_todo_left_percentage" className={s.chartContent}></div>
      </div>
    </div>
  );
}
