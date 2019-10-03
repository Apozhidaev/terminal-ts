import { Actions, ActionTypes } from "./actions";
import { Profile } from "./saga/repository";

export type StorageStateType = {
  profile?: Profile;
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
