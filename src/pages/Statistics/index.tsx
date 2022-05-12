import React, {useState} from 'react';
import s from './index.module.scss';
import {Select, DatePicker, Radio} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {
  changeShowingRangeAction,
  toogleShowingTypeAction,
} from '@/redux/statistics/actions';
import {RootState} from '~/@types/store';
import Charts from './components';
import {RangePickerValue} from '~/@types/statistics';
import {getTimeRange} from '~/src/util';
const {RangePicker} = DatePicker;
const {Option} = Select;

export default function () {
  const {showingRange} = useSelector((state: RootState) => state.statistics);
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

  const [value, setValue] = React.useState(1);

  const onChange = (e: any) => {
    dispatch(toogleShowingTypeAction());
    setValue(e.target.value);
  };

  return (
    <div className={s.statistic}>
      <div>
        <div className={s.line}>
          <div className={s.title}>展示的时间范围：</div>
          <RangePicker
            value={showingRange}
            onChange={handleRangeChange}
          ></RangePicker>
        </div>
        <div className={s.line}>
          <div className={s.title}>快捷选择：</div>
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
      </div>
      <div className={s.line}>
        <div className={s.title}>显示范围：</div>
        <Radio.Group onChange={onChange} value={value}>
          <Radio value={1}>任务清单数据</Radio>
          <Radio value={2}>专注计时数据</Radio>
        </Radio.Group>
      </div>
      <Charts />
    </div>
  );
}
