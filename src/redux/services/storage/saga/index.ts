import {
  take,
  fork,
  put,
  delay,
  race,
} from 'redux-saga/effects';
import { selectState } from '../../../redux-utils';
import { createBackupKey } from '../../../../tools/crypto';
import * as utils from './repository';
import * as actions from '../actions';
import * as backupActions from '../../backup/actions';
import * as modelActions from '../../../model/actions';
import {
  ActionTypes,
  SetProfileBeginAction,
} from '../actions';

function* init() {
  while (true) {
    yield take(ActionTypes.INIT_BEGIN);
    const profile = utils.getProfile();
    const keyValues = utils.getDictionary();
    yield put(actions.init.end({ profile, keyValues }));
  }
}

function* setProfile() {
  while (true) {
    const profileAction: SetProfileBeginAction = yield take(ActionTypes.SET_PROFILE_BEGIN);
    const profile: any = {};
    if (profileAction.local) {
      profile.local = true;
    } else {
      profile.token = profileAction.token;
      profile.encryptionKey = createBackupKey(profileAction.password, profileAction.name);
    }
    utils.setProfile(profile);
    yield put(actions.setProfile.end({ profile }));
  }
}

function* updateDictionary() {
  while (true) {
    const { keyValues: kvs } = yield take(ActionTypes.UPDATE_DICTIONARY_BEGIN);
    utils.updateDictionary(kvs);
    const { sync, keyValues } = utils.getUnsyncKeyValues();
    yield put(actions.updateDictionary.end({ sync, keyValues }));
  }
}

function* clear() {
  while (true) {
    yield take(ActionTypes.CLEAR);
    utils.clear();
  }
}

// backup

function* loadStorage() {
  while (true) {
    yield take(ActionTypes.SET_PROFILE_END);
    const { profile } = yield selectState((state) => state.services.storage);
    if (profile.local) {
      utils.syncDictionary({ keyValues: [], syncedKeys: [], sync: Date.now() });
      yield put(modelActions.init.begin({ keyValues: [] }));
    } else {
      yield put(backupActions.getStorage.request({ token: profile.token }));
      const { success: storageAction } = yield race({
        success: take(backupActions.ActionTypes.GET_STORAGE_SUCCESS),
        failure: take(backupActions.ActionTypes.GET_STORAGE_FAILURE),
      });
      if (storageAction) {
        const { keyValues, sync } = storageAction as backupActions.StorageSuccessAction;
        utils.syncDictionary({ keyValues, sync, syncedKeys: [] });
        yield put(modelActions.init.begin({ keyValues }));
      } else {
        yield put(actions.setProfile.begin({ local: true }));
      }
    }
  }
}

function* syncStorageWithBackup() {
  while (true) {
    const { sync, keyValues } = yield take(ActionTypes.UPDATE_DICTIONARY_END);
    const { backup, storage } = yield selectState((state) => state.services);
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
    } = yield take(backupActions.ActionTypes.SYNC_STORAGE_SUCCESS);
    utils.syncDictionary({ sync, keyValues, syncedKeys });
  }
}

function* syncStorageTask() {
  const FIRST_INTERVAL = 1 * 1000;
  yield delay(FIRST_INTERVAL);
  const { backup, storage } = yield selectState((state) => state.services);
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
