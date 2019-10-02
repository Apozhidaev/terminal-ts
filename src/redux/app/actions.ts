import { action } from '../redux-utils';
import * as decryptedContent from './decryptedContent/actions';
import * as editingForm from './editingForm/actions';
import * as root from './root/actions';

export { decryptedContent, editingForm, root };

export enum ActionTypes {
  SIGN_IN_BEGIN = 'APP_SIGN_IN_BEGIN',
  SIGN_IN_END = 'APP_SIGN_IN_END',
  SIGN_OUT = 'APP_SIGN_OUT',
  SET_ARCHIVE = 'APP_SET_ARCHIVE',
  CREATE_SLOT = 'APP_CREATE_SLOT',
  EDIT_SLOT = 'APP_EDIT_SLOT',
  UPDATE_SLOT_COUNT = 'APP_UPDATE_SLOT_COUNT',
}

type SignInBeginAction = {
  type: ActionTypes.SIGN_IN_BEGIN;
  name: string;
  password: string;
};

type SignInEndAction = {
  type: ActionTypes.SIGN_IN_END;
};

type SignOutAction = {
  type: ActionTypes.SIGN_OUT;
};

type SetArchiveAction = {
  type: ActionTypes.SET_ARCHIVE;
  value: boolean;
};

type CreateSlotAction = {
  type: ActionTypes.CREATE_SLOT;
  parentId: number
};

type EditSlotAction = {
  type: ActionTypes.EDIT_SLOT;
  id: number
};

type UpdateSlotCountAction = {
  type: ActionTypes.UPDATE_SLOT_COUNT;
  count: number
};

export type Actions = SignInBeginAction | SignInEndAction | SignOutAction | SetArchiveAction
  | CreateSlotAction | EditSlotAction | UpdateSlotCountAction;

export const signIn = {
  begin: ({ name, password }: Omit<SignInBeginAction, 'type'>) => action(ActionTypes.SIGN_IN_BEGIN, { name, password }),
  end: () => action(ActionTypes.SIGN_IN_END),
};
export const signOut = () => action(ActionTypes.SIGN_OUT);
export const setArchive = (value: boolean) => action(ActionTypes.SET_ARCHIVE, { value });
export const createSlot = (parentId?: number) => action(ActionTypes.CREATE_SLOT, { parentId });
export const editSlot = (id: number) => action(ActionTypes.EDIT_SLOT, { id });
export const updateSlotCount = (count: number) => action(ActionTypes.UPDATE_SLOT_COUNT, { count });
