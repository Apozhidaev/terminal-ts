import {
  action,
  actionType,
  flowType,
  APP,
  EDIT,
  RESOURCE,
} from '../../../redux-utils';

const newType = (type) => actionType(APP, EDIT, RESOURCE, type);
const newFlowType = (type) => flowType(newType(type));

export const INIT = newType('INIT');
export const SET_URL = newType('SET_VALUE');
export const SET_DESC = newType('SET_DESC');
export const REMOVE = newType('REMOVE');
export const INVALIDATE = newFlowType('INVALIDATE');

export const init = ({ resources }) => action(INIT, { resources });
export const setUrl = ({ key, url }) => action(SET_URL, { key, url });
export const setDesc = ({ key, description }) => action(SET_DESC, { key, description });
export const remove = (key) => action(REMOVE, { key });

export const invalidate = {
  begin: () => action(INVALIDATE.BEGIN),
  end: ({ values }) => action(INVALIDATE.END, { values }),
};
