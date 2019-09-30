import {
  put,
  take,
  fork,
  select,
  race,
} from 'redux-saga/effects';
import * as actions from './actions';

let idCounter = 0;

function* init() {
  while (true) {
    const { resources } = yield take(actions.INIT);
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
      take(actions.INVALIDATE.BEGIN),
      take(actions.SET_URL),
    ]);
    const { values: before } = yield select((state) => state.app.editingForm.resource);
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
