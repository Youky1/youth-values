import {init} from 'echarts';
import {PieChart} from '~/@types/statistics';

/****************创建表格的封装方法****************/
export const $ = (id: string) =>
  document.getElementById(id) || document.createElement('div');

// 创建 折线图/柱状图 方法
export const createChart = (
  title: string,
  xData: Array<string>,
  yData: Array<number> | any,
  domId: string,
  type: string
) => {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    xAxis: {
      type: 'category',
      data: xData,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: yData,
        type,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
      },
    ],
    title: {
      x: 'center',
      y: 'bottom',
      text: title,
    },
  };
  init($(domId)).setOption(option);
};

export const createPieChart = ({title, domId, data}: PieChart) => {
  const option = {
    title: {
      text: title,
      top: 'bottom',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        type: 'pie',
        radius: '50%',
        data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
    color: ['#f56c6c', '#e6a23c', '#67c23a', '#909399'],
  };
  init($(domId)).setOption(option);
};
