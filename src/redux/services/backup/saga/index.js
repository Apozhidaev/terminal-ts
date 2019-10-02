import {
  put,
  call,
  fork,
  take,
  takeEvery,
  select,
} from 'redux-saga/effects';
import * as actions from '../actions';
import * as utils from './utils';


// profile
function* fetchProfile({ name, password }) {
  try {
    const profile = yield call(utils.getProfile, { name, password });
    yield put(actions.getProfile.success(profile));
  } catch (err) {
    yield put(actions.getProfile.failure(err));
  }
}

function* getProfile() {
  yield takeEvery(actions.GET_PROFILE.REQUEST, fetchProfile);
}

// store
function* fetchStore({ token }) {
  try {
    const { keyValues, sync } = yield call(utils.getStorage, { token });
    const { encryptionKey } = yield select((state) => state.services.storage.profile);
    const decryptedKeyValues = utils.decryptKeyValues(keyValues, encryptionKey);
    yield put(actions.getStorage.success({ keyValues: decryptedKeyValues, sync }));
  } catch (err) {
    yield put(actions.getStorage.failure(err));
  }
}

function* getStorage() {
  yield takeEvery(actions.GET_STORAGE.REQUEST, fetchStore);
}

function* syncStorage() {
  while (true) {
    const { keyValues, sync } = yield take(actions.SYNC_STORAGE.REQUEST);
    const { token, encryptionKey } = yield select((state) => state.services.storage.profile);
    const kvs = keyValues.slice(0, 500);
    const encryptedKeyValues = utils.encryptKeyValues(keyValues, encryptionKey);
    try {
      const res = yield call(utils.syncStorage, {
        token,
        sync,
        keyValues: encryptedKeyValues,
      });
      const decryptedKeyValues = utils.decryptKeyValues(res.keyValues, encryptionKey);
      yield put(actions.syncStorage.success({
        sync: res.sync,
        keyValues: decryptedKeyValues,
        syncedKeys: kvs,
      }));
    } catch (err) {
      yield put(actions.syncStorage.failure(err));
    }
  }
}

export default function* backupSaga() {
  yield fork(getProfile);
  yield fork(getStorage);
  yield fork(syncStorage);
}
