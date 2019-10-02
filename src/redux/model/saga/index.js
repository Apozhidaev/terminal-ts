import {
  put,
  take,
  fork,
  takeEvery,
} from 'redux-saga/effects';
import * as actions from '../actions';
import * as storageActions from '../../services/storage/actions';
import * as utils from './utils';
import { ActionTypes } from '../actions';


function* init() {
  while (true) {
    const { keyValues } = yield take(ActionTypes.INIT_BEGIN);
    const model = utils.setModel(keyValues);
    yield put(actions.init.end({ keyValues, ...model }));
  }
}

function* create() {
  while (true) {
    const { fields } = yield take(ActionTypes.CREATE_SLOT_BEGIN);
    const { slot, addedLinks, keyValues } = utils.createSlot({ fields });
    yield put(actions.createSlot.end({ slot, addedLinks, keyValues }));
  }
}


function* update() {
  while (true) {
    const { id, fields } = yield take(ActionTypes.UPDATE_SLOT_BEGIN);
    const {
      slot,
      addedLinks,
      removedLinks,
      keyValues,
    } = utils.updateSlot({ id, fields });
    yield put(actions.updateSlot.end({
      slot,
      addedLinks,
      removedLinks,
      keyValues,
    }));
  }
}

function* upload() {
  while (true) {
    const { source } = yield take(ActionTypes.UPLOAD_BEGIN);
    const { keyValues, model } = utils.upload(source);
    yield put(actions.upload.end({ keyValues, ...model }));
  }
}

function* remove() {
  while (true) {
    const { id } = yield take(ActionTypes.REMOVE_SLOT_BEGIN);
    const { slot, removedLinks, keyValues } = utils.removeSlot({ id });
    yield put(actions.removeSlot.end({ slot, removedLinks, keyValues }));
  }
}

function* autoSaveToSorage() {
  function* saveToSorage({ keyValues }) {
    yield put(storageActions.updateDictionary.begin({ keyValues }));
  }
  yield takeEvery(ActionTypes.UPLOAD_END, saveToSorage);
  yield takeEvery(ActionTypes.CREATE_SLOT_END, saveToSorage);
  yield takeEvery(ActionTypes.UPDATE_SLOT_END, saveToSorage);
  yield takeEvery(ActionTypes.REMOVE_SLOT_END, saveToSorage);
}


export default function* documentSaga() {
  yield fork(init);
  yield fork(upload);
  yield fork(create);
  yield fork(update);
  yield fork(remove);
  yield fork(autoSaveToSorage);
}
