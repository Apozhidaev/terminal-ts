import { fork } from 'redux-saga/effects';
import backupSaga from './backup/saga';
import storageSaga from './storage/saga';
import historySaga from './history/saga';


export default function* servicesSaga() {
  yield fork(backupSaga);
  yield fork(storageSaga);
  yield fork(historySaga);
}
