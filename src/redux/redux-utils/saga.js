import { race, take, call, put } from 'redux-saga/effects';


export function* takeFetch(fetchType) {
  const { SUCCESS, FAILURE } = fetchType;
  return yield race({ success: take(SUCCESS), failure: take(FAILURE) });
}

export function api(fetchType, fetchAction, fetch) {
  return function* apiTask() {
    while (true) {
      const { params } = yield take(fetchType.REQUEST);
      try {
        const data = yield call(fetch, params);
        yield put(fetchAction.success(data));
      } catch (err) {
        yield put(fetchAction.failure(err));
      }
    }
  };
}
