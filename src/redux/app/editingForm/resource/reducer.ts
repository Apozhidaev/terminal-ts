import { Actions, ActionTypes, ResourceType } from "./actions";

export type ResourceStateType = {
  values: ResourceType[],
};

const resource = (
  state: ResourceStateType = {
    values: [],
  },
  action: Actions,
): ResourceStateType => {
  switch (action.type) {
    case ActionTypes.INVALIDATE_END:
      return {
        ...state,
        values: action.values,
      };
    case ActionTypes.SET_URL:
      return {
        ...state,
        values: state.values.map((x) => {
          if (x.key === action.key) {
            return {
              ...x,
              url: action.url,
            };
          }
          return x;
        }),
      };
    case ActionTypes.SET_DESC:
      return {
        ...state,
        values: state.values.map((x) => {
          if (x.key === action.key) {
            return {
              ...x,
              description: action.description,
            };
          }
          return x;
        }),
      };
    case ActionTypes.REMOVE:
      return {
        ...state,
        values: state.values.filter((x) => x.key !== action.key),
      };
    default:
      return state;
  }
};

export default resource;
