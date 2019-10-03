import * as decryptedContent from "./decryptedContent/actions";
import * as editingForm from "./editingForm/actions";
import * as root from "./root/actions";

export { decryptedContent, editingForm, root };

export enum ActionTypes {
  SIGN_IN_BEGIN = "APP_SIGN_IN_BEGIN",
  SIGN_IN_END = "APP_SIGN_IN_END",
  SIGN_OUT = "APP_SIGN_OUT",
  SET_ARCHIVE = "APP_SET_ARCHIVE",
  CREATE_SLOT = "APP_CREATE_SLOT",
  EDIT_SLOT = "APP_EDIT_SLOT",
  UPDATE_SLOT_COUNT = "APP_UPDATE_SLOT_COUNT",
}

export type SignInBeginAction = {
  type: ActionTypes.SIGN_IN_BEGIN;
  name: string;
  password: string;
};

export type SignInEndAction = {
  type: ActionTypes.SIGN_IN_END;
};

export type SignOutAction = {
  type: ActionTypes.SIGN_OUT;
};

export type SetArchiveAction = {
  type: ActionTypes.SET_ARCHIVE;
  value: boolean;
};

export type CreateSlotAction = {
  type: ActionTypes.CREATE_SLOT;
  parentId: number
};

export type EditSlotAction = {
  type: ActionTypes.EDIT_SLOT;
  id: number
};

export type UpdateSlotCountAction = {
  type: ActionTypes.UPDATE_SLOT_COUNT;
  count: number
};

export type Actions = SignInBeginAction | SignInEndAction | SignOutAction | SetArchiveAction
  | CreateSlotAction | EditSlotAction | UpdateSlotCountAction;

export const signIn = {
  begin: ({ name, password }: Omit<SignInBeginAction, "type">) => ({ name, password, type: ActionTypes.SIGN_IN_BEGIN }),
  end: () => ({ type: ActionTypes.SIGN_IN_END }),
};
export const signOut = () => ({type: ActionTypes.SIGN_OUT});
export const setArchive = (value: boolean) => ({ value, type: ActionTypes.SET_ARCHIVE });
export const createSlot = (parentId?: number) => ({ parentId, type: ActionTypes.CREATE_SLOT });
export const editSlot = (id: number) => ({ id, type: ActionTypes.EDIT_SLOT });
export const updateSlotCount = (count: number) => ({ count, type: ActionTypes.UPDATE_SLOT_COUNT });
