import * as actions from './actions';


const decryptedContent = (state = {}, action) => {
  switch (action.type) {
    case actions.DECRYPT.END:
      return {
        ...state,
        [action.id]: {
          key: action.key,
          value: action.value,
        },
      };
    case actions.DECRYPT.CRASH:
      return {
        ...state,
        [action.id]: {
          error: action.error,
        },
      };
    case actions.RESET:
      if (action.id) {
        const newState = { ...state };
        delete newState[action.id];
        return newState;
      }
      return {};
    default:
      return state;
  }
};

export default decryptedContent;
