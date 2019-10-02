import {
  put,
  take,
  fork,
  takeEvery,
} from 'redux-saga/effects';
import * as actions from '../actions';
import * as storageActions from '../../services/storage/actions';
import * as utils from './repository';
import {
  ActionTypes,
  UpdateSlotEndAction,
  UploadEndAction,
  CreateSlotEndAction,
  RemoveSlotEndAction,
  InitBeginAction,
  CreateSlotBeginAction,
  UpdateSlotBeginAction,
  UploadBeginAction,
  RemoveSlotBeginAction,
} from '../actions';

function* init() {
  while (true) {
    const { keyValues }: InitBeginAction = yield take(ActionTypes.INIT_BEGIN);
    const model = utils.setModel(keyValues);
    yield put(actions.init.end({ ...model }));
  }
}

function* create() {
  while (true) {
    const { fields }: CreateSlotBeginAction = yield take(ActionTypes.CREATE_SLOT_BEGIN);
    const { slot, keyValues, source } = utils.createSlot({ fields });
    yield put(actions.createSlot.end({ slot, keyValues, source }));
  }
}

function* update() {
  while (true) {
    const { id, fields }: UpdateSlotBeginAction = yield take(ActionTypes.UPDATE_SLOT_BEGIN);
    const {
      slot,
      keyValues,
      source,
    } = utils.updateSlot({ id, fields });
    yield put(actions.updateSlot.end({
      slot,
      keyValues,
      source,
    }));
  }
}

function* upload() {
  while (true) {
    const { source }: UploadBeginAction = yield take(ActionTypes.UPLOAD_BEGIN);
    const { keyValues, model } = utils.upload(source);
    yield put(actions.upload.end({ keyValues, ...model }));
  }
}

function* remove() {
  while (true) {
    const { id }: RemoveSlotBeginAction = yield take(ActionTypes.REMOVE_SLOT_BEGIN);
    const { slot, keyValues, source } = utils.removeSlot({ id });
    yield put(actions.removeSlot.end({ slot, keyValues, source }));
  }
}

function* autoSaveToSorage() {
  function* saveToSorage({ keyValues }: Pick<UploadEndAction, 'keyValues'>) {
    yield put(storageActions.updateDictionary.begin({ keyValues }));
  }
  yield takeEvery<UploadEndAction>(ActionTypes.UPLOAD_END, saveToSorage);
  yield takeEvery<CreateSlotEndAction>(ActionTypes.CREATE_SLOT_END, saveToSorage);
  yield takeEvery<UpdateSlotEndAction>(ActionTypes.UPDATE_SLOT_END, saveToSorage);
  yield takeEvery<RemoveSlotEndAction>(ActionTypes.REMOVE_SLOT_END, saveToSorage);
}

export default function* documentSaga() {
  yield fork(init);
  yield fork(upload);
  yield fork(create);
  yield fork(update);
  yield fork(remove);
  yield fork(autoSaveToSorage);
}
