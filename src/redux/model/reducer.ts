import { Actions, ActionTypes } from "./actions";
import { Slot, Book, KeyValue } from "./saga/source";

export type ModelStateType = {
  keyValues?: KeyValue[],
  source: Book,
  slots: Slot[],
  children: Slot[][],
  parents: Slot[][],
};

function initState(): ModelStateType {
  return {
    source: new Book({ slots: [], links: [] }),
    slots: [],
    children: [],
    parents: [],
  };
}

const model = (
  state: ModelStateType = initState(),
  action: Actions,
): ModelStateType => {
  switch (action.type) {
    case ActionTypes.INIT_END:
    case ActionTypes.UPLOAD_END:
      return {
        ...state,
        source: action.source,
        slots: action.slots,
        children: action.children,
        parents: action.parents,
      };
    case ActionTypes.CREATE_SLOT_END:
    case ActionTypes.UPDATE_SLOT_END:
    case ActionTypes.REMOVE_SLOT_END:
      return { ...state };
    case ActionTypes.RESET:
      return initState();
    default:
      return state;
  }
};

export default model;
