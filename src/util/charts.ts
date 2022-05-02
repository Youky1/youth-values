import {init} from 'echarts';
import {PieChart} from '~/@types/statistics';
import {merge} from 'lodash';

/****************创建表格的封装方法****************/
export const $ = (id: string) =>
  document.getElementById(id) || document.createElement('div');

// 创建 折线图/柱状图 方法
export const createChart = (
  title: string,
  xData: Array<string>,
  yData: Array<number> | any,
  domId: string,
  type: string,
  config?: any
) => {
  const option = merge(
    {
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
    },
    config
  );
  init($(domId)).setOption(option);
};

// 创建水平方向的 折线图/柱状图 方法
export const createChartHorizontal = (
  title: string,
  xData: Array<number> | any,
  yData: Array<string>,
  domId: string,
  type: string,
  config?: any
) => {
  const option = merge(
    {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      xAxis: {
        type: 'value',
      },
      yAxis: {
        type: 'category',
        data: yData,
      },
      series: [
        {
          data: xData,
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
    },
    config
  );
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

export const createHeatMap = (domId: string, data: Array<[string, number]>) => {
  const option = {
    visualMap: {
      min: 0,
      max: 10,
      type: 'piecewise',
      orient: 'horizontal',
      left: 'center',
      top: 65,
      pieces: [
        {lte: 1, color: '#EBEDF0'},
        {lte: 3, gt: 1, color: '#9BE9A8'},
        {lte: 6, gt: 3, color: '#40C463'},
        {gt: 6, color: '#216E39'},
      ],
    },
    calendar: {
      top: 120,
      left: 30,
      right: 30,
      cellSize: ['auto', 13],
      range: '2022',
    },
    series: {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      data,
    },
  };
  init($(domId)).setOption(option);
};
