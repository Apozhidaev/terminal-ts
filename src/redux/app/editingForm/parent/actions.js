import {
  action,
  actionType,
  flowType,
  APP,
  EDIT,
  PARENT,
} from '../../../redux-utils';

const newType = (type) => actionType(APP, EDIT, PARENT, type);
const newFlowType = (type) => flowType(newType(type));

export const INIT = newType('INIT');
export const SEARCH = newType('SEARCH');
export const LINK = newFlowType('LINK');
export const UNLINK = newFlowType('UNLINK');
export const INVALIDATE = newFlowType('INVALIDATE');

export const init = ({ values }) => action(INIT, { values });
export const search = (query) => action(SEARCH, { query });

export const link = {
  begin: (id) => action(LINK.BEGIN, { id }),
  end: ({ values }) => action(LINK.END, { values }),
};
export const unlink = {
  begin: (id) => action(UNLINK.BEGIN, { id }),
  end: ({ values }) => action(UNLINK.END, { values }),
};
export const invalidate = {
  begin: () => action(INVALIDATE.BEGIN),
  end: ({ candidates }) => action(INVALIDATE.END, { candidates }),
};
