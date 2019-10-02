import {
  put,
  take,
  fork,
  select,
} from 'redux-saga/effects';
import * as actions from './actions';
import { ActionTypes as DecryptedContentActionTypes } from '../../decryptedContent/actions';


function* invalidate() {
  while (true) {
    const { id, value } = yield take(DecryptedContentActionTypes.DECRYPT_END);
    const { initParams } = yield select((state) => state.app.editingForm);
    if (initParams.id === id) {
      yield put(actions.init({ value, encrypted: true, password: '' }));
    }
  }
}

export default function* contentFormSaga() {
  yield fork(invalidate);
}