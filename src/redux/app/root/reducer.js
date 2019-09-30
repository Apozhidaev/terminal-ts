import * as actions from './actions';


const root = (state = { searchQuery: '', maxItem: 50, slots: [] }, action) => {
  switch (action.type) {
    case actions.SEARCH:
      return {
        ...state,
        searchQuery: action.query,
        maxItem: 50,
      };
    case actions.SHOW_MORE:
      return {
        ...state,
        maxItem: state.maxItem + 20,
      };
    case actions.INVALIDATE.END:
      return {
        ...state,
        slots: action.slots,
      };
    default:
      return state;
  }
};

export default root;
