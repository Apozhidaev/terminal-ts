import * as actions from './actions';


const resource = (state = {
  values: [],
}, action) => {
  switch (action.type) {
    case actions.INVALIDATE.END:
      return {
        ...state,
        values: action.values,
      };
    case actions.SET_URL:
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
    case actions.SET_DESC:
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
    case actions.REMOVE:
      return {
        ...state,
        values: state.values.filter((x) => x.key !== action.key),
      };
    default:
      return state;
  }
};

export default resource;
