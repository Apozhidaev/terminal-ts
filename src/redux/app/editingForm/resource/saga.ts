import {
  put,
  take,
  fork,
  race,
} from 'redux-saga/effects';
import { selectState } from '../../../redux-utils';
import * as actions from './actions';
import { ActionTypes, InitAction } from './actions';
import { ResourceStateType } from './reducer';

let idCounter = 0;

function* init() {
  while (true) {
    const { resources }: InitAction = yield take(ActionTypes.INIT);
    const values = [];
    for (let i = 0; i < resources.length; i++) {
      const resourceItem = resources[i];
      values[i] = {
        ...resourceItem,
        key: ++idCounter,
      };
    }
    values.push({
      key: ++idCounter,
      url: '',
      description: '',
    });
    yield put(actions.invalidate.end({ values }));
  }
}

function* invalidate() {
  while (true) {
    yield race([
      take(ActionTypes.INVALIDATE_BEGIN),
      take(ActionTypes.SET_URL),
    ]);
    const { values: before }: ResourceStateType = yield selectState((state) => state.app.editingForm.resource);
    for (let i = 0; i < before.length; i++) {
      const resourceItem = before[i];
      if (!resourceItem.key) {
        before[i] = {
          ...resourceItem,
          key: ++idCounter,
        };
      }
    }
    let values;
    if (before.length === 0 || before[before.length - 1].url) {
      values = [...before, {
        key: ++idCounter,
        url: '',
        description: '',
      }];
    } else {
      values = before;
    }
    yield put(actions.invalidate.end({ values }));
  }
}

export default function* editResourceSaga() {
  yield fork(init);
  yield fork(invalidate);
}
