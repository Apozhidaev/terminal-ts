import { Actions, ActionTypes } from './actions';

export type DecryptedContentStateType = {
  [index: number]: {
    key: any,
    value?: string,
    error?: Error,
  };
};

const decryptedContent = (state = {}, action: Actions) => {
  switch (action.type) {
    case ActionTypes.DECRYPT_END:
      return {
        ...state,
        [action.id]: {
          key: action.key,
          value: action.value,
        },
      };
    case ActionTypes.DECRYPT_CRASH:
      return {
        ...state,
        [action.id]: {
          error: action.error,
        },
      };
    case ActionTypes.RESET:
      if (action.id) {
        const newState: any = { ...state };
        delete newState[action.id];
        return newState;
      }
      return {};
    default:
      return state;
  }
};

export default decryptedContent;
