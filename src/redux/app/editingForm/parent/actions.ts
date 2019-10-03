import { Slot } from "../../../model/saga/source";

export enum ActionTypes {
  INIT = "APP_EDIT_PARENT_INIT",
  SEARCH = "APP_EDIT_PARENT_SEARCH",
  LINK_BEGIN = "APP_EDIT_PARENT_LINK_BEGIN",
  LINK_END = "APP_EDIT_PARENT_LINK_END",
  UNLINK_BEGIN = "APP_EDIT_PARENT_UNLINK_BEGIN",
  UNLINK_END = "APP_EDIT_PARENT_UNLINK_END",
  INVALIDATE_BEGIN = "APP_EDIT_PARENT_INVALIDATE_BEGIN",
  INVALIDATE_END = "APP_EDIT_PARENT_INVALIDATE_END",
}

type ParentParams = {
  values: Slot[];
};

type InitAction = ParentParams & {
  type: ActionTypes.INIT;
};

type SearchAction = {
  type: ActionTypes.SEARCH;
  query: string;
};

export type LinkBeginAction = {
  type: ActionTypes.LINK_BEGIN;
  id: number
};

type LinkEndAction = ParentParams & {
  type: ActionTypes.LINK_END;
};

export type UnlinkBeginAction = {
  type: ActionTypes.UNLINK_BEGIN;
  id: number
};

type UnlinkEndAction = ParentParams & {
  type: ActionTypes.UNLINK_END;
};

type InvalidateBeginAction = {
  type: ActionTypes.INVALIDATE_BEGIN;
  id: number
};

type InvalidateEndAction = {
  type: ActionTypes.INVALIDATE_END;
  candidates: Slot[];
};

export type Actions = InitAction | SearchAction
  | LinkBeginAction | LinkEndAction
  | UnlinkBeginAction | UnlinkEndAction
  | InvalidateBeginAction | InvalidateEndAction;

export const init = ({ values }: ParentParams) => ({ values, type: ActionTypes.INIT });
export const search = (query: string) => ({ query, type: ActionTypes.SEARCH });

export const link = {
  begin: (id: number) => ({ id, type: ActionTypes.LINK_BEGIN }),
  end: ({ values }: ParentParams) => ({ values, type: ActionTypes.LINK_END }),
};
export const unlink = {
  begin: (id: number) => ({ id, type: ActionTypes.UNLINK_BEGIN }),
  end: ({ values }: ParentParams) => ({ values, type: ActionTypes.UNLINK_END }),
};
export const invalidate = {
  begin: () => ({type: ActionTypes.INVALIDATE_BEGIN}),
  end: ({ candidates }: Omit<InvalidateEndAction, "type">) => ({ candidates, type: ActionTypes.INVALIDATE_END }),
};
