import {
  put,
  take,
  fork,
  throttle,
  race,
} from 'redux-saga/effects';
import { selectState } from '../../../redux-utils';
import search from '../../../model/saga/search';
import * as actions from './actions';
import { ActionTypes, LinkBeginAction, UnlinkBeginAction } from './actions';
import { ParentStateType } from './reducer';
import { ModelStateType } from '../../../model/reducer';
import { Slot } from '../../../model/saga/source';

function* throttleSearch() {
  yield throttle(500, ActionTypes.SEARCH, function* fetchSearch() {
    yield put(actions.invalidate.begin());
  });
}

function* link() {
  while (true) {
    const { id }: LinkBeginAction = yield take(ActionTypes.LINK_BEGIN);
    const { slots }: ModelStateType = yield selectState((state) => state.model);
    const { values: before }: ParentStateType = yield selectState((state) => state.app.editingForm.parent);
    const values = [...before, slots[id]];
    yield put(actions.link.end({ values }));
  }
}

function* unlink() {
  while (true) {
    const { id }: UnlinkBeginAction = yield take(ActionTypes.UNLINK_BEGIN);
    const { values: before }: ParentStateType = yield selectState((state) => state.app.editingForm.parent);
    const values = [...before.filter((x) => x.id !== id)];
    yield put(actions.link.end({ values }));
  }
}

function* invalidate() {
  while (true) {
    yield race([
      take(ActionTypes.INVALIDATE_BEGIN),
      take(ActionTypes.LINK_END),
      take(ActionTypes.UNLINK_END),
    ]);
    const { source }: ModelStateType = yield selectState((state) => state.model);
    const { values, searchQuery }: ParentStateType = yield selectState((state) => state.app.editingForm.parent);
    const skipSet = new Set(values.map((x) => x.id));
    const candidates = (search(source.slots, searchQuery) as Slot[])
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
