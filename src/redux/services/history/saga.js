import { take, fork } from 'redux-saga/effects';
import { history } from '../../../tools';
import * as actions from './actions';


function* navigate() {
  while (true) {
    const { path, replace } = yield take(actions.NAVIGATE);
    if (replace) {
      history.replace(path);
    } else {
      history.push(path);
    }
  }
}

function* back() {
  while (true) {
    yield take(actions.BACK);
    history.goBack();
  }
}

export default function* historySaga() {
  yield fork(navigate);
  yield fork(back);
}
