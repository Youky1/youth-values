import React, {useRef} from 'react';
import s from '../index.module.scss';
import {useStopwatch} from 'react-timer-hook';
import {formatTime} from '@/util';
import {Tooltip} from 'antd';

export default function () {
  const beginTime = useRef(new Date());
  const {seconds, minutes, hours, isRunning, start, pause} = useStopwatch({
    autoStart: true,
  });
  return (
    <div className={s.clock}>
      <div className={s.wrapper}>
        <h1>专注计时中</h1>
        <p className={s.info}>
          <span>开始时间</span> | <span>{formatTime(beginTime.current)}</span>
        </p>
        <div className={s.clockBox}>
          <div>{hours}</div>
          <span>:</span>
          <div>{minutes}</div>
          <span>:</span>
          <div>{seconds}</div>
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
            <i className="iconfont icon-jieshu"></i>
          </Tooltip>
          <Tooltip overlay="放弃计时" placement="bottom">
            <i className="iconfont icon-fangqi1"></i>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
