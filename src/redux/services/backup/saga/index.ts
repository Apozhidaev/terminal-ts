import {
  put,
  call,
  fork,
  take,
  takeEvery,
} from "redux-saga/effects";
import { selectState } from "../../../redux-utils";
import * as actions from "../actions";
import * as utils from "./utils";
import {
  ActionTypes,
  ProfileRequestAction,
  StorageRequestAction,
  StorageSuccessAction,
  SyncStorageRequestAction,
} from "../actions";

// profile
function* fetchProfile({ name, password }: ProfileRequestAction) {
  try {
    const profile = yield call(utils.getProfile, { name, password });
    yield put(actions.getProfile.success(profile));
  } catch (err) {
    yield put(actions.getProfile.failure(err));
  }
}

function* getProfile() {
  yield takeEvery<ProfileRequestAction>(ActionTypes.GET_PROFILE_REQUEST, fetchProfile);
}

// store
function* fetchStore({ token }: StorageRequestAction) {
  try {
    const { keyValues, sync }: StorageSuccessAction = yield call(utils.getStorage, { token });
    const { encryptionKey } = yield selectState((state) => state.services.storage.profile);
    const decryptedKeyValues = utils.decryptKeyValues(keyValues, encryptionKey);
    yield put(actions.getStorage.success({ keyValues: decryptedKeyValues, sync }));
  } catch (err) {
    yield put(actions.getStorage.failure(err));
  }
}

function* getStorage() {
  yield takeEvery<StorageRequestAction>(ActionTypes.GET_STORAGE_REQUEST, fetchStore);
}

function* syncStorage() {
  while (true) {
    const { keyValues, sync }: SyncStorageRequestAction = yield take(ActionTypes.SYNC_STORAGE_REQUEST);
    const { token, encryptionKey } = yield selectState((state) => state.services.storage.profile);
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
