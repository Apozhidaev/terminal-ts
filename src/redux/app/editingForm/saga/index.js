import {
  put,
  take,
  fork,
  select,
} from 'redux-saga/effects';
import parentSaga from '../parent/saga';
import contentSaga from '../content/saga';
import resourceSaga from '../resource/saga';
import * as actions from '../actions';
import * as modelActions from '../../../model/actions';
import * as utils from './utils';


function* startCreating() {
  while (true) {
    const { parentId } = yield take(actions.START_CREATING);
    const { slots } = yield select((state) => state.model);
    yield put(actions.content.init({
      value: '',
      encrypted: false,
      password: '',
    }));
    const values = [];
    if (parentId) {
      values.push(slots[parentId]);
    }
    yield put(actions.parent.init({ values }));
    yield put(actions.resource.init({ resources: [] }));
  }
}

function* startEditing() {
  while (true) {
    const { id, slot } = yield take(actions.START_EDITING);
    const { parents } = yield select((state) => state.model);
    const { decryptedContent } = yield select((state) => state.app);
    const content = utils.initEditingContent(slot, decryptedContent[slot.id]);
    yield put(actions.content.init(content));
    const values = parents[id] || [];
    yield put(actions.parent.init({ values }));
    yield put(actions.resource.init({ resources: slot.resources || [] }));
  }
}

function* saveChanges() {
  while (true) {
    yield take(actions.SAVE_CHANGES);
    const {
      initParams,
      summary,
      root,
      content,
      resource,
      parent,
    } = yield select((state) => state.app.editingForm);
    const { decryptedContent } = yield select((state) => state.app);
    const { slots } = yield select((state) => state.model);
    const fields = {};
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
