import { combineReducers } from 'redux';
import root from './root/reducer';
import decryptedContent from './decryptedContent/reducer';
import editingForm from './editingForm/reducer';
import * as actions from './actions';


const auth = (state = false, action) => {
  switch (action.type) {
    case actions.SIGN_IN.END:
      return true;
    case actions.SIGN_OUT:
      return false;
    default:
      return state;
  }
};

const archive = (state = false, action) => {
  switch (action.type) {
    case actions.SET_ARCHIVE:
      return action.value;
    default:
      return state;
  }
};

const slotCount = (state = 0, action) => {
  switch (action.type) {
    case actions.UPDATE_SLOT_COUNT:
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
