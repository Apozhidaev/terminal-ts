import { take, fork } from "redux-saga/effects";
import { history } from "../../../tools";
import { ActionTypes, NavigateAction } from "./actions";

function* navigate() {
  while (true) {
    const { path, replace }: NavigateAction = yield take(ActionTypes.NAVIGATE);
    if (replace) {
      history.replace(path);
    } else {
      history.push(path);
    }
  }
}

function* back() {
  while (true) {
    yield take(ActionTypes.BACK);
    history.goBack();
  }
}

export default function* historySaga() {
  yield fork(navigate);
  yield fork(back);
}
