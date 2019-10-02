import * as actions from './actions';


export default (state = {
  profileFetching: false,
  storageFetching: false,
  syncStatus: 0,
}, action) => {
  switch (action.type) {
    case actions.GET_PROFILE.REQUEST:
      return {
        ...state,
        profileFetching: true,
      };
    case actions.GET_PROFILE.SUCCESS:
    case actions.GET_PROFILE.FAILURE:
      return {
        ...state,
        profileFetching: false,
      };
    case actions.GET_STORAGE.REQUEST:
      return {
        ...state,
        storageFetching: true,
      };
    case actions.GET_STORAGE.SUCCESS:
    case actions.GET_STORAGE.FAILURE:
      return {
        ...state,
        storageFetching: false,
      };
    case actions.SYNC_STORAGE.REQUEST:
      return {
        ...state,
        syncStatus: 1,
      };
    case actions.SYNC_STORAGE.SUCCESS:
      return {
        ...state,
        syncStatus: 0,
      };
    case actions.SYNC_STORAGE.FAILURE:
      return {
        ...state,
        syncStatus: 2,
      };
    default:
      return state;
  }
};
