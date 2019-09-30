import {
  action,
  actionType,
  // flowType,
  APP,
  EDIT,
  CONTENT,
} from '../../../redux-utils';

const newType = (type) => actionType(APP, EDIT, CONTENT, type);
// const newFlowType = type => flowType(newType(type));

export const INIT = newType('INIT');
export const SET_VALUE = newType('SET_VALUE');
export const SET_ENCRYPTED = newType('SET_ENCRYPTED');
export const SET_PASSWORD = newType('SET_PASSWORD');

export const init = ({
  value,
  encrypted,
  password,
}) => action(INIT, {
  value,
  encrypted,
  password,
});
export const setValue = (value) => action(SET_VALUE, { value });
export const setEncrypted = (encrypted) => action(SET_ENCRYPTED, { encrypted });
export const setPassword = (password) => action(SET_PASSWORD, { password });
