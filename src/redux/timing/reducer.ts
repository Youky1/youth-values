import {defaultTimingState} from '~/@types/timing';
import {Action} from '~/@types/store';
import {cloneDeep} from 'lodash';
import * as Con from './constants';
import {getIndex} from '@/util';

const defaultState: defaultTimingState = {
  eventList: [],
  currentEvent: null,
  isTiming: false,
};

export default function (state = defaultState, action: Action) {
  const newState = cloneDeep(state);
  const {type, payload} = action;
  switch (type) {
    case Con.INIT_EVENT_LIST: {
      newState.eventList = payload;
      break;
    }
    case Con.ADD_EVENT: {
      newState.eventList.push({name: payload, record: []});
      console.log('newState: ', newState);
      break;
    }
    case Con.SET_CURRENT_EVENT: {
      newState.currentEvent = payload;
      break;
    }
    case Con.DELETE_EVENT: {
      if (newState.currentEvent?.name === payload) {
        newState.currentEvent = null;
      }
      const i = getIndex(newState.eventList, payload);
      newState.eventList.splice(i, 1);
      break;
    }
    case Con.EDIT_EVENT: {
      const {oldName, newName} = payload;
      const i = getIndex(newState.eventList, oldName);
      newState.eventList[i].name = newName;
      break;
    }
    case Con.SET_IS_TIMING: {
      newState.isTiming = payload;
      break;
    }
  }
  return newState;
}
