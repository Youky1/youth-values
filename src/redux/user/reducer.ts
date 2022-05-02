import {cloneDeep} from 'lodash';
import {Action} from '~/@types/store';
import {UserInfo} from '~/@types/user';
import Con from './constants';

const defaultState: UserInfo = {
  id: '',
  password: '',
};

export default (state = defaultState, action: Action) => {
  const newState = cloneDeep(state);
  const {type, payload} = action;
  switch (type) {
    case Con.SET_USER_INFO: {
      newState.id = payload.id;
      newState.password = payload.password;
      break;
    }
    case Con.CHANGE_PASSWORD: {
      newState.password = payload;
      break;
    }
    case Con.REMOVE_USER: {
      newState.id = '';
      newState.password = '';
      break;
    }
  }
  return newState;
};
