import { Book, Slot, KeyValue, Fields } from './saga/source';

export enum ActionTypes {
  INIT_BEGIN = 'MODEL_INIT_BEGIN',
  INIT_END = 'MODEL_INIT_END',
  UPLOAD_BEGIN = 'MODEL_UPLOAD_BEGIN',
  UPLOAD_END = 'MODEL_UPLOAD_END',
  RESET = 'MODEL_RESET',
  CREATE_SLOT_BEGIN = 'MODEL_CREATE_SLOT_BEGIN',
  CREATE_SLOT_END = 'MODEL_CREATE_SLOT_END',
  UPDATE_SLOT_BEGIN = 'MODEL_UPDATE_SLOT_BEGIN',
  UPDATE_SLOT_END = 'MODEL_UPDATE_SLOT_END',
  REMOVE_SLOT_BEGIN = 'MODEL_REMOVE_SLOT_BEGIN',
  REMOVE_SLOT_END = 'MODEL_REMOVE_SLOT_END',
}

export type InitBeginAction = {
  type: ActionTypes.INIT_BEGIN;
  keyValues: KeyValue[];
};

export type InitEndAction = {
  type: ActionTypes.INIT_END;
  source: Book;
  slots: Slot[];
  children: Slot[][];
  parents: Slot[][];
};

export type UploadBeginAction = {
  type: ActionTypes.UPLOAD_BEGIN;
  source: Book;
};

export type UploadEndAction = {
  type: ActionTypes.UPLOAD_END;
  keyValues: KeyValue[];
  source: Book;
  slots: Slot[];
  children: Slot[][];
  parents: Slot[][];
};

export type ResetAction = {
  type: ActionTypes.RESET;
};

export type CreateSlotBeginAction = {
  type: ActionTypes.CREATE_SLOT_BEGIN;
  fields: Fields;
};

export type CreateSlotEndAction = {
  type: ActionTypes.CREATE_SLOT_END;
  slot: Slot;
  keyValues: KeyValue[];
  source: Book;
};

export type UpdateSlotBeginAction = {
  type: ActionTypes.UPDATE_SLOT_BEGIN;
  id: number;
  fields: Fields;
};

export type UpdateSlotEndAction = {
  type: ActionTypes.UPDATE_SLOT_END;
  slot: Slot;
  keyValues: KeyValue[];
  source: Book;
};

export type RemoveSlotBeginAction = {
  type: ActionTypes.REMOVE_SLOT_BEGIN;
  id: number;
};

export type RemoveSlotEndAction = {
  type: ActionTypes.REMOVE_SLOT_END;
  slot: Slot;
  keyValues: KeyValue[];
  source: Book;
};

export type Actions = InitBeginAction | InitEndAction | UploadBeginAction | UploadEndAction
  | ResetAction | CreateSlotBeginAction | CreateSlotEndAction
  | UpdateSlotBeginAction | UpdateSlotEndAction | RemoveSlotBeginAction | RemoveSlotEndAction;

export const init = {
  begin: ({ keyValues }: Omit<InitBeginAction, 'type'>) => ({ keyValues, type: ActionTypes.INIT_BEGIN }),
  end: ({
    source,
    slots,
    children,
    parents,
  }: Omit<InitEndAction, 'type'>) => ({
    source,
    slots,
    children,
    parents,
    type: ActionTypes.INIT_END,
  }),
};

export const upload = {
  begin: ({ source }: Omit<UploadBeginAction, 'type'>) => ({ source, type: ActionTypes.UPLOAD_BEGIN }),
  end: ({
    keyValues,
    source,
    slots,
    children,
    parents,
  }: Omit<UploadEndAction, 'type'>) => ({
    keyValues,
    source,
    slots,
    children,
    parents,
    type: ActionTypes.UPLOAD_END,
  }),
};

export const reset = () => ({ type: ActionTypes.RESET });

export const createSlot = {
  begin: ({ fields }: Omit<CreateSlotBeginAction, 'type'>) => ({ fields, type: ActionTypes.CREATE_SLOT_BEGIN }),
  end: ({
    slot,
    keyValues,
    source,
  }: Omit<CreateSlotEndAction, 'type'>) => ({
    slot,
    keyValues,
    source,
    type: ActionTypes.CREATE_SLOT_END,
  }),
};

export const updateSlot = {
  begin: ({ id, fields }: Omit<UpdateSlotBeginAction, 'type'>) => ({
    id,
    fields,
    type: ActionTypes.UPDATE_SLOT_BEGIN,
  }),
  end: ({
    slot,
    keyValues,
    source,
  }: Omit<UpdateSlotEndAction, 'type'>) => ({
    slot,
    keyValues,
    source,
    type: ActionTypes.UPDATE_SLOT_END,
  }),
};

export const removeSlot = {
  begin: ({ id }: Omit<RemoveSlotBeginAction, 'type'>) => ({ id, type: ActionTypes.REMOVE_SLOT_BEGIN }),
  end: ({
    slot,
    keyValues,
    source,
  }: Omit<RemoveSlotEndAction, 'type'>) => ({
    slot,
    keyValues,
    source,
    type: ActionTypes.REMOVE_SLOT_END,
  }),
};
