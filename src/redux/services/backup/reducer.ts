import { Actions, ActionTypes } from "./actions";

export type BackupStateType = {
  profileFetching: boolean;
  storageFetching: boolean;
  syncStatus: number;
};

export default (
  state: BackupStateType = {
    profileFetching: false,
    storageFetching: false,
    syncStatus: 0,
  },
  action: Actions,
): BackupStateType => {
  switch (action.type) {
    case ActionTypes.GET_PROFILE_REQUEST:
      return {
        ...state,
        profileFetching: true,
      };
    case ActionTypes.GET_PROFILE_SUCCESS:
    case ActionTypes.GET_PROFILE_FAILURE:
      return {
        ...state,
        profileFetching: false,
      };
    case ActionTypes.GET_STORAGE_REQUEST:
      return {
        ...state,
        storageFetching: true,
      };
    case ActionTypes.GET_STORAGE_SUCCESS:
    case ActionTypes.GET_STORAGE_FAILURE:
      return {
        ...state,
        storageFetching: false,
      };
    case ActionTypes.SYNC_STORAGE_REQUEST:
      return {
        ...state,
        syncStatus: 1,
      };
    case ActionTypes.SYNC_STORAGE_SUCCESS:
      return {
        ...state,
        syncStatus: 0,
      };
    case ActionTypes.SYNC_STORAGE_FAILURE:
      return {
        ...state,
        syncStatus: 2,
      };
    default:
      return state;
  }
};
