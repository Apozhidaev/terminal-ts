import { combineReducers } from 'redux';
import content from './content/reducer';
import parent from './parent/reducer';
import resource from './resource/reducer';
import * as actions from './actions';


const initParams = (state = {}, action) => {
  switch (action.type) {
    case actions.START_CREATING:
      return {
        parentId: action.parentId,
        create: true,
      };
    case actions.START_EDITING:
      return {
        id: action.id,
      };
    default:
      return state;
  }
};

const summary = (state = '', action) => {
  switch (action.type) {
    case actions.SET_SUMMARY:
      return action.summary;
    case actions.START_EDITING:
      return action.slot.summary;
    case actions.START_CREATING:
      return '';
    default:
      return state;
  }
};

const root = (state = false, action) => {
  switch (action.type) {
    case actions.SET_ROOT:
      return action.root;
    case actions.START_EDITING:
      return !!action.slot.root;
    case actions.START_CREATING:
      return false;
    default:
      return state;
  }
};

const editingForm = combineReducers({
  initParams,
  summary,
  root,
  content,
  parent,
  resource,
});

export default editingForm;
