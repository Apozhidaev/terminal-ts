import {
  action,
  actionType,
  flowType,
  APP,
} from '../redux-utils';
import * as decryptedContent from './decryptedContent/actions';
import * as editingForm from './editingForm/actions';
import * as root from './root/actions';

export { decryptedContent, editingForm, root };

const newType = (type) => actionType(APP, type);
const newFlowType = (type) => flowType(newType(type));

export const SIGN_IN = newFlowType('SIGN_IN');
export const SIGN_OUT = newType('SIGN_OUT');
export const SET_ARCHIVE = newType('SET_ARCHIVE');
export const CREATE_SLOT = newType('CREATE_SLOT');
export const EDIT_SLOT = newType('EDIT_SLOT');
export const UPDATE_SLOT_COUNT = newType('UPDATE_SLOT_COUNT');

export const signIn = {
  begin: ({ name, password }) => action(SIGN_IN.BEGIN, { name, password }),
  end: () => action(SIGN_IN.END),
};
export const signOut = () => action(SIGN_OUT);
export const setArchive = (value) => action(SET_ARCHIVE, { value });
export const createSlot = (parentId) => action(CREATE_SLOT, { parentId });
export const editSlot = (id) => action(EDIT_SLOT, { id });
export const updateSlotCount = (count) => action(UPDATE_SLOT_COUNT, { count });
