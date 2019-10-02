import { Actions, ActionTypes } from './actions';

export type StorageStateType = {
  profile?: any;
};

export default (state: StorageStateType = {}, action: Actions): StorageStateType => {
  switch (action.type) {
    case ActionTypes.SET_PROFILE_END:
    case ActionTypes.INIT_END:
      return {
        ...state,
        profile: action.profile,
      };
    default:
      return state;
  }
};
