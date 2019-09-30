import {
  put,
  take,
  fork,
  takeEvery,
} from 'redux-saga/effects';
import * as actions from '../actions';
import * as storageActions from '../../services/storage/actions';
import * as utils from './utils';


function* init() {
  while (true) {
    const { keyValues } = yield take(actions.INIT.BEGIN);
    const model = utils.setModel(keyValues);
    yield put(actions.init.end({ keyValues, ...model }));
  }
}

function* create() {
  while (true) {
    const { fields } = yield take(actions.CREATE_SLOT.BEGIN);
    const { slot, addedLinks, keyValues } = utils.createSlot({ fields });
    yield put(actions.createSlot.end({ slot, addedLinks, keyValues }));
  }
}


function* update() {
  while (true) {
    const { id, fields } = yield take(actions.UPDATE_SLOT.BEGIN);
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
    const { source } = yield take(actions.UPLOAD.BEGIN);
    const { keyValues, model } = utils.upload(source);
    yield put(actions.upload.end({ keyValues, ...model }));
  }
}

function* remove() {
  while (true) {
    const { id } = yield take(actions.REMOVE_SLOT.BEGIN);
    const { slot, removedLinks, keyValues } = utils.removeSlot({ id });
    yield put(actions.removeSlot.end({ slot, removedLinks, keyValues }));
  }
}

function* autoSaveToSorage() {
  function* saveToSorage({ keyValues }) {
    yield put(storageActions.updateDictionary.begin({ keyValues }));
  }
  yield takeEvery(actions.UPLOAD.END, saveToSorage);
  yield takeEvery(actions.CREATE_SLOT.END, saveToSorage);
  yield takeEvery(actions.UPDATE_SLOT.END, saveToSorage);
  yield takeEvery(actions.REMOVE_SLOT.END, saveToSorage);
}


export default function* documentSaga() {
  yield fork(init);
  yield fork(upload);
  yield fork(create);
  yield fork(update);
  yield fork(remove);
  yield fork(autoSaveToSorage);
}
