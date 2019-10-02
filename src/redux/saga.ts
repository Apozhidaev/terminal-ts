import { fork } from 'redux-saga/effects';
import servicesSaga from './services/saga';
import modelSaga from './model/saga';
import appSaga from './app/saga';

export default function* rootSaga() {
  yield fork(servicesSaga);
  yield fork(modelSaga);
  yield fork(appSaga);
}
