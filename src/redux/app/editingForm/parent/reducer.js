import * as actions from './actions';


const parent = (state = {
  searchQuery: '',
  values: [],
  candidates: [],
}, action) => {
  switch (action.type) {
    case actions.INIT:
      return {
        searchQuery: '',
        values: action.values,
        candidates: [],
      };
    case actions.SEARCH:
      return {
        ...state,
        searchQuery: action.query,
      };
    case actions.LINK.END:
    case actions.UNLINK.END:
      return {
        ...state,
        values: action.values,
      };
    case actions.INVALIDATE.END:
      return {
        ...state,
        candidates: action.candidates,
      };
    default:
      return state;
  }
};

export default parent;
