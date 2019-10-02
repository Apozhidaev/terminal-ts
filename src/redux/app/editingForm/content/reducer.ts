import { Actions, ActionTypes } from './actions';

export type ContentStateType = {
  value: string,
  password: string,
  encrypted: boolean,
};

const content = (
  state: ContentStateType = {
    value: '',
    password: '',
    encrypted: false,
  },
  action: Actions,
): ContentStateType => {
  switch (action.type) {
    case ActionTypes.INIT:
      return {
        value: action.value,
        password: action.password,
        encrypted: action.encrypted,
      };
    case ActionTypes.SET_VALUE:
      return {
        ...state,
        value: action.value,
      };
    case ActionTypes.SET_ENCRYPTED:
      return {
        ...state,
        encrypted: action.encrypted,
      };
    case ActionTypes.SET_PASSWORD:
      return {
        ...state,
        password: action.password,
      };
    default:
      return state;
  }
};

export default content;
