import {
  put,
  take,
  fork,
  select,
  throttle,
  race,
} from 'redux-saga/effects';
import * as actions from '../actions';
import * as modelActions from '../../../model/actions';
import * as appActions from '../../actions';
import * as utils from './utils';
import { ActionTypes } from '../actions';


function* throttleSearch() {
  yield throttle(500, ActionTypes.SEARCH, function* fetchSearch() {
    yield put(actions.invalidate.begin());
  });
}

function* invalidate() {
  while (true) {
    yield race([
      take(ActionTypes.INVALIDATE_BEGIN),
      take(appActions.ActionTypes.SET_ARCHIVE),
      take(modelActions.ActionTypes.INIT_END),
      take(modelActions.ActionTypes.UPLOAD_END),
      take(modelActions.ActionTypes.CREATE_SLOT_END),
      take(modelActions.ActionTypes.UPDATE_SLOT_END),
      take(modelActions.ActionTypes.REMOVE_SLOT_END),
    ]);
    const { root, archive } = yield select((state) => state.app);
    const { source, parents } = yield select((state) => state.model);
    const slots = utils.filter({
      source,
      parents,
      searchQuery: root.searchQuery,
      archive,
    });
    yield put(actions.invalidate.end(slots));
  }
}

export default function* rootAppSaga() {
  yield fork(invalidate);
  yield fork(throttleSearch);
}
