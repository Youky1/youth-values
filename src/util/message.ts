import {debounce} from 'lodash';
import {message} from 'antd';
export const successTip = debounce(
  (str: string) => {
    message.success(str);
  },
  500,
  {leading: true}
);
export const failTip = debounce((str: string) => {
  message.error(str);
}, 500);
