import React, {useState} from 'react';
import s from './index.module.scss';
import {Drawer, Switch, Tooltip, Select, DatePicker} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {
  changeShowingRangeAction,
  toogleShowingTodoAction,
  toogleShowingTimingAction,
} from '@/redux/statistics/actions';
import {RootState} from '~/@types/store';
import Charts from './components';
import Title from '@/component/title';
import {RangePickerValue} from '~/@types/statistics';
import {getTimeRange} from '~/src/util';
const {RangePicker} = DatePicker;
const {Option} = Select;

export default function () {
  // 是否显示设置
  const [visiable, setVisiable] = useState(false);

  const {showingRange, showingTodo, showingTiming} = useSelector(
    (state: RootState) => state.statistics
  );
  const [selectedDate, setSelectedDate] = useState('周/月/年');

  const dispatch = useDispatch();

  // 选择的时间范围
  const handleRangeChange = (dates: RangePickerValue) => {
    dispatch(changeShowingRangeAction(dates));
  };

  // 快捷改变日期范围
  const handleFastRangeChange = (value: string) => {
    setSelectedDate(value);
    const {weekStart, weekEnd, monthStart, monthEnd, yearStart, yearEnd} =
      getTimeRange();
    if (value === '本周') {
      handleRangeChange([weekStart, weekEnd]);
    } else if (value === '本月') {
      handleRangeChange([monthStart, monthEnd]);
    } else if (value === '本年') {
      handleRangeChange([yearStart, yearEnd]);
    }
  };

  // 选择的内容范围
  const handleTodoShowingChange = () => dispatch(toogleShowingTodoAction());

  const handleTimingShowingChange = () => dispatch(toogleShowingTimingAction());

  return (
    <div className={s.statistic}>
      <div
        className="mainButton"
        style={{
          right: 60,
          bottom: 100,
        }}
        onClick={() => setVisiable(true)}
      >
        <Tooltip overlay="展开设置">
          <i className="iconfont icon-shezhi"></i>
        </Tooltip>
      </div>

      {/* 配置项 */}
      <Drawer
        title="显示配置"
        visible={visiable}
        placement="right"
        onClose={() => setVisiable(false)}
        width={640}
        className={s.drawer}
      >
        <Title>显示的时间范围</Title>
        <div className="lineContainer">
          <p>快捷选择</p>
          <Select
            value={selectedDate}
            onChange={handleFastRangeChange}
            style={{width: 120}}
          >
            <Option value="本周">本周</Option>
            <Option value="本月">本月</Option>
            <Option value="本年">本年</Option>
          </Select>
        </div>

        <div className={s.dateBox}>
          <RangePicker
            style={{width: '80%'}}
            value={showingRange}
            onChange={handleRangeChange}
          ></RangePicker>
        </div>

        <Title>显示的内容</Title>

        <div className="lineContainer">
          <p>任务清单数据</p>
          <Switch checked={showingTodo} onChange={handleTodoShowingChange} />
        </div>

        <div className="lineContainer">
          <p>专注计时数据</p>
          <Switch
            checked={showingTiming}
            onChange={handleTimingShowingChange}
          />
        </div>
      </Drawer>

      {/* 经过筛选的数据统计 */}
      <Charts />
    </div>
  );
}
