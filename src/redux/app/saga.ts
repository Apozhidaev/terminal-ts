import {
  put,
  take,
  fork,
  race,
} from "redux-saga/effects";
import { selectState } from "../redux-utils";
import rootAppSaga from "./root/saga";
import decryptedContentSaga from "./decryptedContent/saga";
import editFormSaga from "./editingForm/saga";
import * as storageActions from "../services/storage/actions";
import * as historyActions from "../services/history/actions";
import * as backupActions from "../services/backup/actions";
import * as modelActions from "../model/actions";
import * as actions from "./actions";
import {
  ActionTypes,
  SignInBeginAction,
  CreateSlotAction,
  EditSlotAction,
} from "./actions";
import { ModelStateType } from "../model/reducer";
import { AppStateType } from "../app/reducer";

function* signIn() {
  while (true) {
    const { name, password }: SignInBeginAction = yield take(ActionTypes.SIGN_IN_BEGIN);
    yield put(backupActions.getProfile.request({ name, password }));
    const { success: profileAction } = yield race({
      success: take(backupActions.ActionTypes.GET_PROFILE_SUCCESS),
      failure: take(backupActions.ActionTypes.GET_PROFILE_FAILURE),
    });
    if (profileAction) {
      const { profile: { token } } = profileAction as backupActions.ProfileSuccessAction;
      yield put(storageActions.setProfile.begin({ token, name, password }));
    } else {
      yield put(storageActions.setProfile.begin({ local: true }));
    }
    yield put(actions.signIn.end());
    yield put(historyActions.goRoot());
  }
}

function* signOut() {
  while (true) {
    yield take(ActionTypes.SIGN_OUT);
    yield put(modelActions.reset());
    yield put(storageActions.clear());
    yield put(historyActions.navigate({ path: "/sign-in" }));
  }
}

function* createSlot() {
  while (true) {
    const { parentId }: CreateSlotAction = yield take(ActionTypes.CREATE_SLOT);
    yield put(actions.editingForm.startCreating({ parentId }));
    yield put(historyActions.goCreate(parentId));
  }
}

function* editSlot() {
  while (true) {
    const { id }: EditSlotAction = yield take(ActionTypes.EDIT_SLOT);
    const { slots }: ModelStateType = yield selectState((state) => state.model);
    const slot = slots[id];
    yield put(actions.editingForm.startEditing({ id, slot }));
    yield put(historyActions.goEdit(id));
  }
}

function* slotCount() {
  while (true) {
    yield race([
      take(ActionTypes.SET_ARCHIVE),
      take(modelActions.ActionTypes.INIT_END),
      take(modelActions.ActionTypes.UPLOAD_END),
      take(modelActions.ActionTypes.CREATE_SLOT_END),
      take(modelActions.ActionTypes.REMOVE_SLOT_END),
    ]);
    const { archive }: AppStateType = yield selectState((state) => state.app);
    const { source }: ModelStateType = yield selectState((state) => state.model);
    const count = source.slots.reduce(
      (acc, slot) => (!!slot.archive === archive ? acc + 1 : acc),
      0,
    );
    yield put(actions.updateSlotCount(count));
  }
}

function* startup() {
  yield put(storageActions.init.begin());
  const { profile, keyValues }: storageActions.InitEndAction = yield take(storageActions.ActionTypes.INIT_END);
  if (profile) {
    yield put(actions.signIn.end());
    yield put(modelActions.init.begin({ keyValues }));
  }
}

export default function* appSaga() {
  yield fork(rootAppSaga);
  yield fork(decryptedContentSaga);
  yield fork(editFormSaga);
  yield fork(signIn);
  yield fork(signOut);
  yield fork(createSlot);
  yield fork(editSlot);
  yield fork(slotCount);
  yield fork(startup);
}
