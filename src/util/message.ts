import {debounce} from 'lodash';
import {message} from 'antd';
export const successTip = debounce((str: any) => {
  message.success(str);
}, 500);
export const failTip = debounce((str: any) => {
  message.error(str);
}, 500);
