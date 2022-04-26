import {defaultStatisticState} from '~/@types/statistics';
import {Action} from '~/@types/store';
import {cloneDeep} from 'lodash';
import Con from './constants';
import moment from 'moment';

const defaultState: defaultStatisticState = {
  showingRange: [moment().startOf('day'), moment().endOf('day')],
  showingTodo: true,
  showingTiming: true,
};

export default function (state = defaultState, action: Action) {
  const newState = cloneDeep(state);
  const {type, payload} = action;
  switch (type) {
    case Con.CHANGE_RANGE: {
      newState.showingRange = payload;
      break;
    }
    case Con.CHANGE_SHOWING_TIMING: {
      newState.showingTiming = !newState.showingTiming;
      break;
    }
    case Con.CHANGE_SHOWING_TODO: {
      newState.showingTodo = !newState.showingTodo;
      break;
    }
  }
  return newState;
}
