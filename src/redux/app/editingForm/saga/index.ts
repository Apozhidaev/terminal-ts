import {
  put,
  take,
  fork,
} from 'redux-saga/effects';
import { selectState } from '../../../redux-utils';
import parentSaga from '../parent/saga';
import contentSaga from '../content/saga';
import resourceSaga from '../resource/saga';
import * as actions from '../actions';
import * as modelActions from '../../../model/actions';
import * as utils from './utils';
import { ActionTypes } from '../actions';
import { EditingFormSateType } from '../reducer';
import { ModelStateType } from '../../../model/reducer';

function* startCreating() {
  while (true) {
    const { parentId } = yield take(ActionTypes.START_CREATING);
    const { slots } = yield selectState((state) => state.model);
    yield put(actions.content.init({
      value: '',
      encrypted: false,
      password: '',
    }));
    const values = [];
    if (parentId > 0) {
      values.push(slots[parentId]);
    }
    yield put(actions.parent.init({ values }));
    yield put(actions.resource.init({ resources: [] }));
  }
}

function* startEditing() {
  while (true) {
    const { id, slot } = yield take(ActionTypes.START_EDITING);
    const { parents } = yield selectState((state) => state.model);
    const { decryptedContent } = yield selectState((state) => state.app);
    const content = utils.initEditingContent(slot, decryptedContent[slot.id]);
    yield put(actions.content.init(content));
    const values = parents[id] || [];
    yield put(actions.parent.init({ values }));
    yield put(actions.resource.init({ resources: slot.resources || [] }));
  }
}

function* saveChanges() {
  while (true) {
    yield take(ActionTypes.SAVE_CHANGES);
    const {
      initParams,
      summary,
      root,
      content,
      resource,
      parent,
    }: EditingFormSateType = yield selectState((state) => state.app.editingForm);
    const { decryptedContent } = yield selectState((state) => state.app);
    const { slots }: ModelStateType = yield selectState((state) => state.model);
    const fields: any = {};
    fields.parents = parent.values;
    const resources = resource.values.filter((x) => x.url);
    fields.resources = resources.map((x) => ({
      url: x.url,
      description: x.description,
    }));

    if (initParams.create) {
      fields.summary = summary;
      if (root) {
        fields.root = root;
      }
      utils.createContent(fields, content);
      yield put(modelActions.createSlot.begin({ fields }));
    } else {
      const { id } = initParams;
      const slot = slots[id];
      if (summary !== slot.summary) {
        fields.summary = summary;
      }
      if (!!slot.root !== root) {
        fields.root = root;
      }
      utils.updateContent(fields, slot, content, decryptedContent[id]);
      yield put(modelActions.updateSlot.begin({ id, fields }));
    }
  }
}

export default function* editFormSaga() {
  yield fork(parentSaga);
  yield fork(contentSaga);
  yield fork(resourceSaga);
  yield fork(startCreating);
  yield fork(startEditing);
  yield fork(saveChanges);
}
