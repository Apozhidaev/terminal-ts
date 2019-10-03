import { Actions, ActionTypes } from "./actions";
import { Slot } from "../../../model/saga/source";

export type ParentStateType = {
  searchQuery: string,
  values: Slot[],
  candidates: Slot[],
};

const parent = (
  state: ParentStateType = {
    searchQuery: "",
    values: [],
    candidates: [],
  },
  action: Actions,
): ParentStateType => {
  switch (action.type) {
    case ActionTypes.INIT:
      return {
        searchQuery: "",
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
