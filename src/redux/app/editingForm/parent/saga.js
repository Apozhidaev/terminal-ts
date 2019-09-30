import {
  put,
  take,
  fork,
  select,
  throttle,
  race,
} from 'redux-saga/effects';
import search from '../../../../tools/search';
import * as actions from './actions';


function* throttleSearch() {
  yield throttle(500, actions.SEARCH, function* fetchSearch() {
    yield put(actions.invalidate.begin());
  });
}

function* link() {
  while (true) {
    const { id } = yield take(actions.LINK.BEGIN);
    const { slots } = yield select((state) => state.model);
    const { values: before } = yield select((state) => state.app.editingForm.parent);
    const values = [...before, slots[id]];
    yield put(actions.link.end({ values }));
  }
}

function* unlink() {
  while (true) {
    const { id } = yield take(actions.UNLINK.BEGIN);
    const { values: before } = yield select((state) => state.app.editingForm.parent);
    const values = [...before.filter((x) => x.id !== id)];
    yield put(actions.link.end({ values }));
  }
}

function* invalidate() {
  while (true) {
    yield race([
      take(actions.INVALIDATE.BEGIN),
      take(actions.LINK.END),
      take(actions.UNLINK.END),
    ]);
    const { source } = yield select((state) => state.model);
    const { values, searchQuery } = yield select((state) => state.app.editingForm.parent);
    const skipSet = new Set(values.map((x) => x.id));
    const candidates = search(source.slots, searchQuery)
      .filter((x) => !skipSet.has(x.id))
      .slice(0, 10);
    yield put(actions.invalidate.end({ candidates }));
  }
}

export default function* parentSaga() {
  yield fork(throttleSearch);
  yield fork(link);
  yield fork(unlink);
  yield fork(invalidate);
}
