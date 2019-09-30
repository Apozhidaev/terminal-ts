import {
  action,
  actionType,
  flowType,
  APP,
  CONTENT,
} from '../../redux-utils';

const newType = (type) => actionType(APP, CONTENT, type);
const newFlowType = (type) => flowType(newType(type));

export const DECRYPT = newFlowType('DECRYPT');
export const RESET = newType('RESET');

export const decrypt = {
  begin: ({ id, password }) => action(DECRYPT.BEGIN, { id, password }),
  end: ({ id, key, value }) => action(DECRYPT.END, { id, value, key }),
  crash: ({ id, error }) => action(DECRYPT.CRASH, { id, error }),
};

export const reset = (id) => action(RESET, { id });
