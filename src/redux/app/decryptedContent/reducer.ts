import { WordArray } from "crypto-js";
import { Actions, ActionTypes } from "./actions";

export type DecryptedContentType = {
  key: WordArray,
  value?: string,
  error?: Error,
};

export type DecryptedContentStateType = {
  [index: number]: DecryptedContentType;
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
        const newState: DecryptedContentStateType = { ...state };
        delete newState[action.id];
        return newState;
      }
      return {};
    default:
      return state;
  }
};

export default decryptedContent;
