import {
  put,
  take,
  fork,
  select,
  debounce,
} from 'redux-saga/effects';
import { decryptSlot, createSlotKey } from '../../../tools/crypto';
import * as actions from './actions';
import * as modelActions from '../../model/actions';


function* decrypt() {
  while (true) {
    const { id, password } = yield take(actions.DECRYPT.BEGIN);
    const { slots } = yield select((state) => state.model);
    let key;
    let value;
    let error;
    const slot = slots[id];
    try {
      key = createSlotKey(password);
      value = decryptSlot(key, slot.content.value);
    } catch (err) {
      error = err;
    }
    if (error) {
      yield put(actions.decrypt.crash({ id, error }));
    } else {
      yield put(actions.decrypt.end({ id, key, value }));
    }
  }
}

function* resetAfterUpdate() {
  while (true) {
    const { slot } = yield take(modelActions.UPDATE_SLOT.END);
    yield put(actions.reset(slot.id));
  }
}

function* resetAll() {
  yield put(actions.reset());
}

function* debounceReset() {
  const duration = 30 * 60 * 1000;
  yield debounce(duration, '*', resetAll);
}

export default function* decryptedContentSaga() {
  yield fork(decrypt);
  yield fork(resetAfterUpdate);
  yield fork(debounceReset);
}
