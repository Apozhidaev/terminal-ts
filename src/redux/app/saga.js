import {
  put,
  take,
  fork,
  select,
  race,
} from 'redux-saga/effects';
import { takeFetch } from '../redux-utils/saga';
import rootAppSaga from './root/saga';
import decryptedContentSaga from './decryptedContent/saga';
import editFormSaga from './editingForm/saga';
import * as storageActions from '../services/storage/actions';
import * as historyActions from '../services/history/actions';
import * as backupActions from '../services/backup/actions';
import * as modelActions from '../model/actions';
import * as actions from './actions';


function* signIn() {
  while (true) {
    const { name, password } = yield take(actions.SIGN_IN.BEGIN);
    yield put(backupActions.getProfile.request({ name, password }));
    const { success: profileAction } = yield takeFetch(backupActions.GET_PROFILE);
    if (profileAction) {
      const { profile: { token } } = profileAction;
      yield put(storageActions.setProfile.begin({ token, name, password }));
    } else {
      yield put(storageActions.setProfile.begin({ local: true }));
    }
    yield put(actions.signIn.end());
    yield put(historyActions.goRoot());
  }
}

function* signOut() {
  while (true) {
    yield take(actions.SIGN_OUT);
    yield put(modelActions.reset());
    yield put(storageActions.clear());
    yield put(historyActions.navigate({ path: '/sign-in' }));
  }
}

function* createSlot() {
  while (true) {
    const { parentId } = yield take(actions.CREATE_SLOT);
    yield put(actions.editingForm.startCreating({ parentId }));
    yield put(historyActions.goCreate(parentId));
  }
}

function* editSlot() {
  while (true) {
    const { id } = yield take(actions.EDIT_SLOT);
    const { slots } = yield select((state) => state.model);
    const slot = slots[id];
    yield put(actions.editingForm.startEditing({ id, slot }));
    yield put(historyActions.goEdit(id));
  }
}

function* slotCount() {
  while (true) {
    yield race([
      take(actions.SET_ARCHIVE),
      take(modelActions.INIT.END),
      take(modelActions.UPLOAD.END),
      take(modelActions.CREATE_SLOT.END),
      take(modelActions.REMOVE_SLOT.END),
    ]);
    const { archive } = yield select((state) => state.app);
    const { source } = yield select((state) => state.model);
    const count = source.slots.reduce(
      (acc, slot) => (!!slot.archive === archive ? acc + 1 : acc),
      0,
    );
    yield put(actions.updateSlotCount(count));
  }
}


function* startup() {
  yield put(storageActions.init.begin());
  const { profile, keyValues } = yield take(storageActions.INIT.END);
  if (profile) {
    yield put(actions.signIn.end());
    yield put(modelActions.init.begin({ keyValues }));
  }
}

export default function* appSaga() {
  yield fork(rootAppSaga);
  yield fork(decryptedContentSaga);
  yield fork(editFormSaga);
  yield fork(signIn);
  yield fork(signOut);
  yield fork(createSlot);
  yield fork(editSlot);
  yield fork(slotCount);
  yield fork(startup);
}
