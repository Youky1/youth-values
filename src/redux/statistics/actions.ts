import {RangePickerValue} from '~/@types/statistics';
import Con from './constants';
export const changeShowingRangeAction = (payload: RangePickerValue) => ({
  type: Con.CHANGE_RANGE,
  payload,
});
export const toogleShowingTypeAction = () => ({
  type: Con.TOOGLE_TYPE,
});
