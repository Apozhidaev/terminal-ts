import * as parent from "./parent/actions";
import * as content from "./content/actions";
import * as resource from "./resource/actions";
import { Slot } from "../../model/saga/source";

export { parent, content, resource };

export enum ActionTypes {
  START_CREATING = "APP_EDIT_START_CREATING",
  START_EDITING = "APP_EDIT_START_EDITING",
  SET_SUMMARY = "APP_EDIT_SET_SUMMARY",
  SET_ROOT = "APP_EDIT_SET_ROOT",
  SAVE_CHANGES = "APP_EDIT_SAVE_CHANGES",
}

type StartCreatingParams = {
  parentId: number,
};

type StartEditingParams = {
  id: number,
  slot: Slot,
};

export type StartCreatingAction = StartCreatingParams & {
  type: ActionTypes.START_CREATING;
};

export type StartEditingAction = StartEditingParams & {
  type: ActionTypes.START_EDITING;
};

export type SetSummaryAction = {
  type: ActionTypes.SET_SUMMARY;
  summary: string;
};

export type SetRootAction = {
  type: ActionTypes.SET_ROOT;
  root: boolean;
};

export type SaveChnagesAction = {
  type: ActionTypes.SAVE_CHANGES;
};

export type Actions = StartCreatingAction | StartEditingAction
  | SetSummaryAction | SetRootAction | SaveChnagesAction
  | parent.Actions | content.Actions | resource.Actions;

export const startCreating = ({ parentId }: StartCreatingParams) => ({ parentId, type: ActionTypes.START_CREATING });
export const startEditing = ({ id, slot }: StartEditingParams) => ({ id, slot, type: ActionTypes.START_EDITING });

export const setSummary = (summary: string) => ({ summary, type: ActionTypes.SET_SUMMARY });
export const setRoot = (root: boolean) => ({ root, type: ActionTypes.SET_ROOT });

export const saveChnages = () => ({ type: ActionTypes.SAVE_CHANGES });
