import {
  action,
  actionType,
  // flowType,
  APP,
  EDIT,
} from '../../redux-utils';
import * as parent from './parent/actions';
import * as content from './content/actions';
import * as resource from './resource/actions';

export { parent, content, resource };

const newType = (type) => actionType(APP, EDIT, type);
// const newFlowType = (type) => flowType(newType(type));


export const START_CREATING = newType('START_CREATING');
export const START_EDITING = newType('START_EDITING');
export const SET_SUMMARY = newType('SET_SUMMARY');
export const SET_ROOT = newType('SET_ROOT');
export const SAVE_CHANGES = newType('SAVE_CHANGES');

export const startCreating = ({ parentId }) => action(START_CREATING, { parentId });
export const startEditing = ({ id, slot }) => action(START_EDITING, { id, slot });

export const setSummary = (summary) => action(SET_SUMMARY, { summary });
export const setRoot = (root) => action(SET_ROOT, { root });

export const saveChnages = () => action(SAVE_CHANGES);
