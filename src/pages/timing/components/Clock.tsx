import React, {useRef} from 'react';
import s from '../index.module.scss';
import {addRecordAction, setIsTimingAction} from '@/redux/timing/actions';
import {useStopwatch} from 'react-timer-hook';
import {formatTime} from '@/util';
import {Tooltip, Modal} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/@types/store';
const {confirm} = Modal;

export default function () {
  const beginTime = useRef(new Date());
  const {seconds, minutes, hours, isRunning, start, pause, reset} =
    useStopwatch({
      autoStart: true,
    });

  const dispatch = useDispatch();
  const currentEvent = useSelector(
    (state: RootState) => state.timing.currentEvent
  );
  const handleFinishTiming = () => {
    confirm({
      title: '确定要完成计时吗',
      icon: '',
      onOk() {
        const length = hours * 3600 + minutes * 60 + seconds;
        console.log('currentEvent: ', currentEvent);
        dispatch(
          addRecordAction(currentEvent, beginTime.current, new Date(), length)
        );
        dispatch(setIsTimingAction(false));
        reset();
      },
      onCancel() {},
    });
  };
  const handleGiveUp = () => {
    confirm({
      title: '确定要完成计时吗',
      onOk() {
        reset();
        dispatch(setIsTimingAction(false));
      },
      onCancel() {},
    });
  };
  return (
    <div className={s.clock}>
      <div className={s.wrapper}>
        <h1>专注计时中</h1>
        <p className={s.info}>
          <span>开始时间</span> | <span>{formatTime(beginTime.current)}</span>
        </p>
        <div className={s.clockBox}>
          <div>{hours.toString().padStart(2, '0')}</div>
          <span>:</span>
          <div>{minutes.toString().padStart(2, '0')}</div>
          <span>:</span>
          <div>{seconds.toString().padStart(2, '0')}</div>
        </div>
        <div className={s.btnWrapper}>
          <Tooltip
            overlay={isRunning ? '暂停计时' : '继续计时'}
            placement="bottom"
          >
            {isRunning ? (
              <i className="iconfont icon-zanting" onClick={pause}></i>
            ) : (
              <i className="iconfont icon-yunhang" onClick={start}></i>
            )}
          </Tooltip>
          <Tooltip overlay="完成计时" placement="bottom">
            <i
              className="iconfont icon-jieshu"
              onClick={handleFinishTiming}
            ></i>
          </Tooltip>
          <Tooltip overlay="放弃计时" placement="bottom">
            <i className="iconfont icon-fangqi1" onClick={handleGiveUp}></i>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
