import {
  take,
  fork,
  put,
  delay,
  select,
} from 'redux-saga/effects';
import { takeFetch } from '../../../redux-utils/saga';
import { createBackupKey } from '../../../../tools/crypto';
import * as utils from './utils';
import * as actions from '../actions';
import * as backupActions from '../../backup/actions';
import * as modelActions from '../../../model/actions';


function* init() {
  while (true) {
    yield take(actions.INIT.BEGIN);
    const profile = utils.getProfile();
    const keyValues = utils.getDictionary();
    yield put(actions.init.end({ profile, keyValues }));
  }
}

function* setProfile() {
  while (true) {
    const {
      token,
      local,
      name,
      password,
    } = yield take(actions.SET_PROFILE.BEGIN);
    const profile = {};
    if (local) {
      profile.local = local;
    } else {
      profile.token = token;
      profile.encryptionKey = createBackupKey(password, name);
    }
    utils.setProfile(profile);
    yield put(actions.setProfile.end({ profile }));
  }
}

function* updateDictionary() {
  while (true) {
    const { keyValues: kvs } = yield take(actions.UPDATE_DICTIONARY.BEGIN);
    utils.updateDictionary(kvs);
    const { sync, keyValues } = utils.getUnsyncKeyValues();
    yield put(actions.updateDictionary.end({ sync, keyValues }));
  }
}

function* clear() {
  while (true) {
    yield take(actions.CLEAR);
    utils.clear();
  }
}

// backup

function* loadStorage() {
  while (true) {
    yield take(actions.SET_PROFILE.END);
    const { profile } = yield select((state) => state.services.storage);
    if (profile.local) {
      utils.syncDictionary({ keyValues: [], sync: Date.now() });
      yield put(modelActions.init.begin({ keyValues: [] }));
    } else {
      yield put(backupActions.getStorage.request({ token: profile.token }));
      const { success: storageAction } = yield takeFetch(backupActions.GET_STORAGE);
      if (storageAction) {
        const { keyValues, sync } = storageAction;
        utils.syncDictionary({ keyValues, sync });
        yield put(modelActions.init.begin({ keyValues }));
      } else {
        yield put(actions.setProfile.begin({ local: true }));
      }
    }
  }
}

function* syncStorageWithBackup() {
  while (true) {
    const { sync, keyValues } = yield take(actions.UPDATE_DICTIONARY.END);
    const { backup, storage } = yield select((state) => state.services);
    if (!backup.sync && storage.profile && !storage.profile.local) {
      yield put(backupActions.syncStorage.request({ sync, keyValues }));
    }
  }
}

function* syncBackupWithStorage() {
  while (true) {
    const {
      sync,
      keyValues,
      syncedKeys,
    } = yield take(backupActions.SYNC_STORAGE.SUCCESS);
    utils.syncDictionary({ sync, keyValues, syncedKeys });
  }
}

function* syncStorageTask() {
  const FIRST_INTERVAL = 1 * 1000;
  yield delay(FIRST_INTERVAL);
  const { backup, storage } = yield select((state) => state.services);
  if (!backup.sync && storage.profile && !storage.profile.local) {
    const { sync, keyValues } = utils.getUnsyncKeyValues();
    yield put(backupActions.syncStorage.request({ sync, keyValues }));
  }
}

export default function* watcher() {
  yield fork(init);
  yield fork(setProfile);
  yield fork(updateDictionary);
  yield fork(clear);
  // backup
  yield fork(loadStorage);
  yield fork(syncStorageWithBackup);
  yield fork(syncBackupWithStorage);
  yield fork(syncStorageTask);
}
