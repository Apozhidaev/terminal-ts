import { combineReducers } from 'redux';
import content, { ContentStateType } from './content/reducer';
import parent, { ParentStateType } from './parent/reducer';
import resource, { ResourceStateType } from './resource/reducer';
import { Actions, ActionTypes } from './actions';

export type InitParamType = {
  create: true,
  parentId?: number,
} | {
  create?: false,
  id: number,
};

export type EditingFormSateType = {
  initParams: InitParamType,
  summary: string,
  root: boolean,
  content: ContentStateType,
  parent: ParentStateType,
  resource: ResourceStateType,
};

const initParams = (state: InitParamType = { create: true }, action: Actions): InitParamType => {
  switch (action.type) {
    case ActionTypes.START_CREATING:
      return {
        parentId: action.parentId,
        create: true,
      };
    case ActionTypes.START_EDITING:
      return {
        id: action.id,
      };
    default:
      return state;
  }
};

const summary = (state: string = '', action: Actions): string => {
  switch (action.type) {
    case ActionTypes.SET_SUMMARY:
      return action.summary;
    case ActionTypes.START_EDITING:
      return action.slot.summary;
    case ActionTypes.START_CREATING:
      return '';
    default:
      return state;
  }
};

const root = (state: boolean = false, action: Actions): boolean => {
  switch (action.type) {
    case ActionTypes.SET_ROOT:
      return action.root;
    case ActionTypes.START_EDITING:
      return !!action.slot.root;
    case ActionTypes.START_CREATING:
      return false;
    default:
      return state;
  }
};

const editingForm = combineReducers<EditingFormSateType>({
  initParams,
  summary,
  root,
  content,
  parent,
  resource,
});

export default editingForm;
