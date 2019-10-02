import {
  put,
  take,
  fork,
} from 'redux-saga/effects';
import { selectState } from '../../../redux-utils';
import * as actions from './actions';
import { ActionTypes as DecryptedContentActionTypes, DecryptEndAction } from '../../decryptedContent/actions';
import { EditingFormSateType } from '../reducer';

function* invalidate() {
  while (true) {
    const { id, value }: DecryptEndAction = yield take(DecryptedContentActionTypes.DECRYPT_END);
    const { initParams }: EditingFormSateType = yield selectState((state) => state.app.editingForm);
    if (!initParams.create && initParams.id === id) {
      yield put(actions.init({ value, encrypted: true, password: '' }));
    }
  }
}

export default function* contentFormSaga() {
  yield fork(invalidate);
}
