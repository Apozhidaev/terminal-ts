import { Actions, ActionTypes } from "./actions";
import { Slot } from "../../model/saga/source";

export type RootStateType = {
  searchQuery: string,
  maxItem: number,
  slots: Slot[],
};

const root = (
  state: RootStateType = { searchQuery: "", maxItem: 50, slots: [] },
  action: Actions,
): RootStateType => {
  switch (action.type) {
    case ActionTypes.SEARCH:
      return {
        ...state,
        searchQuery: action.query,
        maxItem: 50,
      };
    case ActionTypes.SHOW_MORE:
      return {
        ...state,
        maxItem: state.maxItem + 20,
      };
    case ActionTypes.INVALIDATE_END:
      return {
        ...state,
        slots: action.slots,
      };
    default:
      return state;
  }
};

export default root;
