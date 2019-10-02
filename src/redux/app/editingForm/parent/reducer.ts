import { Actions, ActionTypes } from './actions';

export type ParentStateType = {
  searchQuery: string,
  values: any[],
  candidates: any[],
};

const parent = (
  state: ParentStateType = {
    searchQuery: '',
    values: [],
    candidates: [],
  },
  action: Actions,
): ParentStateType => {
  switch (action.type) {
    case ActionTypes.INIT:
      return {
        searchQuery: '',
        values: action.values,
        candidates: [],
      };
    case ActionTypes.SEARCH:
      return {
        ...state,
        searchQuery: action.query,
      };
    case ActionTypes.LINK_END:
    case ActionTypes.UNLINK_END:
      return {
        ...state,
        values: action.values,
      };
    case ActionTypes.INVALIDATE_END:
      return {
        ...state,
        candidates: action.candidates,
      };
    default:
      return state;
  }
};

export default parent;
