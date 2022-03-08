import React, {useState} from 'react';
import s from './index.module.scss';
import {InputConfig} from '~/@types/common';
import {message} from 'antd';
export default function ({
  callback,
  icon,
  tip,
  placeholder,
  defaultContent,
}: InputConfig) {
  const [inputValue, setInputValue] = useState(defaultContent || '');
  const onInput: React.ChangeEventHandler<HTMLInputElement> = e => {
    setInputValue(e.target.value);
  };
  const emit = () => {
    if (inputValue.length > 0) {
      callback(inputValue);
      setInputValue('');
      if (tip) {
        message.success(tip);
      }
    } else {
      message.warn('输入为空');
    }
  };
  const onKeyDOwn: React.KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter') {
      emit();
    }
  };
  return (
    <div className={s.inputBox}>
      <input
        type="text"
        className={s.input}
        value={inputValue}
        onChange={onInput}
        onKeyDown={onKeyDOwn}
        placeholder={placeholder}
      />
      <i className={s.inputIcon + ' iconfont ' + icon} onClick={emit}></i>
    </div>
  );
}
