import { combineReducers } from 'redux';
import root, { RootStateType } from './root/reducer';
import decryptedContent, { DecryptedContentStateType } from './decryptedContent/reducer';
import editingForm, { EditingFormSateType } from './editingForm/reducer';
import { Actions, ActionTypes } from './actions';

export type AppSateType = {
  auth: boolean,
  archive: boolean,
  slotCount: number,
  root: RootStateType,
  decryptedContent: DecryptedContentStateType,
  editingForm: EditingFormSateType,
};

const auth = (state = false, action: Actions) => {
  switch (action.type) {
    case ActionTypes.SIGN_IN_END:
      return true;
    case ActionTypes.SIGN_OUT:
      return false;
    default:
      return state;
  }
};

const archive = (state = false, action: Actions) => {
  switch (action.type) {
    case ActionTypes.SET_ARCHIVE:
      return action.value;
    default:
      return state;
  }
};

const slotCount = (state = 0, action: Actions) => {
  switch (action.type) {
    case ActionTypes.UPDATE_SLOT_COUNT:
      return action.count;
    default:
      return state;
  }
};

const app = combineReducers({
  auth,
  archive,
  slotCount,
  root,
  decryptedContent,
  editingForm,
});

export default app;
