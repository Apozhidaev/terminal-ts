import {
  put,
  take,
  fork,
  debounce,
} from 'redux-saga/effects';
import { selectState } from '../../redux-utils';
import { decryptSlot, createSlotKey } from '../../../tools/crypto';
import * as actions from './actions';
import * as modelActions from '../../model/actions';
import { ActionTypes, DecryptBeginAction } from './actions';
import { ModelStateType } from '../../model/reducer';
import { UpdateSlotEndAction } from '../../model/actions';

function* decrypt() {
  while (true) {
    const { id, password }: DecryptBeginAction = yield take(ActionTypes.DECRYPT_BEGIN);
    const { slots }: ModelStateType = yield selectState((state) => state.model);
    const slot = slots[id];
    if (!slot.content) throw Error('slot.content === undefinded');
    try {
      const key = createSlotKey(password);
      const value = decryptSlot(key, slot.content.value);
      yield put(actions.decrypt.end({ id, key, value }));
    } catch (error) {
      yield put(actions.decrypt.crash({ id, error }));
    }
  }
}

function* resetAfterUpdate() {
  while (true) {
    const { slot }: UpdateSlotEndAction = yield take(modelActions.ActionTypes.UPDATE_SLOT_END);
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
