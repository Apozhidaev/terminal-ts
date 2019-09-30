import * as actions from './actions';


const model = (state = { source: { slots: [] } }, action) => {
  switch (action.type) {
    case actions.INIT.END:
    case actions.UPLOAD.END:
      return {
        ...state,
        source: action.source,
        slots: action.slots,
        children: action.children,
        parents: action.parents,
      };
    case actions.CREATE_SLOT.END:
    case actions.UPDATE_SLOT.END:
    case actions.REMOVE_SLOT.END:
      return { ...state };
    case actions.RESET:
      return {};
    default:
      return state;
  }
};

export default model;
