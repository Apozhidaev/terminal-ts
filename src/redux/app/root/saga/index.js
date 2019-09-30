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


function* throttleSearch() {
  yield throttle(500, actions.SEARCH, function* fetchSearch() {
    yield put(actions.invalidate.begin());
  });
}

function* invalidate() {
  while (true) {
    yield race([
      take(actions.INVALIDATE.BEGIN),
      take(appActions.SET_ARCHIVE),
      take(modelActions.INIT.END),
      take(modelActions.UPLOAD.END),
      take(modelActions.CREATE_SLOT.END),
      take(modelActions.UPDATE_SLOT.END),
      take(modelActions.REMOVE_SLOT.END),
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
