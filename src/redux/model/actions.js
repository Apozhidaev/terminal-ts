import {
  action,
  actionType,
  flowType,
  MODEL,
} from '../redux-utils';

const newType = (type) => actionType(MODEL, type);
const newFlowType = (type) => flowType(newType(type));

export const INIT = newFlowType('INIT');
export const UPLOAD = newFlowType('UPLOAD');
export const RESET = newType('RESET');
export const CREATE_SLOT = newFlowType('CREATE_SLOT');
export const UPDATE_SLOT = newFlowType('UPDATE_SLOT');
export const REMOVE_SLOT = newFlowType('REMOVE_SLOT');


export const init = {
  begin: ({ keyValues }) => action(INIT.BEGIN, { keyValues }),
  end: ({
    source,
    slots,
    children,
    parents,
  }) => action(INIT.END, {
    source,
    slots,
    children,
    parents,
  }),
};

export const upload = {
  begin: ({ source }) => action(UPLOAD.BEGIN, { source }),
  end: ({
    keyValues,
    source,
    slots,
    children,
    parents,
  }) => action(UPLOAD.END, {
    keyValues,
    source,
    slots,
    children,
    parents,
  }),
};

export const reset = () => action(RESET);

export const createSlot = {
  begin: ({ fields }) => action(CREATE_SLOT.BEGIN, { fields }),
  end: ({
    slot,
    addedLinks,
    keyValues,
    source,
  }) => action(CREATE_SLOT.END, {
    slot,
    addedLinks,
    keyValues,
    source,
  }),
};

export const updateSlot = {
  begin: ({ id, fields }) => action(UPDATE_SLOT.BEGIN, { id, fields }),
  end: ({
    slot,
    addedLinks,
    removedLinks,
    keyValues,
    source,
  }) => action(UPDATE_SLOT.END, {
    slot,
    addedLinks,
    removedLinks,
    keyValues,
    source,
  }),
};

export const removeSlot = {
  begin: ({ id }) => action(REMOVE_SLOT.BEGIN, { id }),
  end: ({
    slot,
    removedLinks,
    keyValues,
    source,
  }) => action(REMOVE_SLOT.END, {
    slot,
    removedLinks,
    keyValues,
    source,
  }),
};
