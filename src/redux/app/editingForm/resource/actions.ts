import { Resource } from '../../../model/saga/source';

export enum ActionTypes {
  INIT = 'APP_EDIT_RESOURCE_INIT',
  SET_URL = 'APP_EDIT_RESOURCE_SET_VALUE',
  SET_DESC = 'APP_EDIT_RESOURCE_SET_DESC',
  REMOVE = 'APP_EDIT_RESOURCE_REMOVE',
  INVALIDATE_BEGIN = 'APP_EDIT_RESOURCE_INVALIDATE_BEGIN',
  INVALIDATE_END = 'APP_EDIT_RESOURCE_INVALIDATE_END',
}

export type ResourceType = Omit<Resource, 'toObj'> & { key: number };

export type InitAction = {
  type: ActionTypes.INIT;
  resources: Resource[];
};

export type SetUrlAction = {
  type: ActionTypes.SET_URL;
  key: number;
  url: string;
};

export type SetDescAction = {
  type: ActionTypes.SET_DESC;
  key: number;
  description: string;
};

export type RemoveAction = {
  type: ActionTypes.REMOVE;
  key: number;
};

export type InvalidateBeginAction = {
  type: ActionTypes.INVALIDATE_BEGIN;
};

export type InvalidateEndAction = {
  type: ActionTypes.INVALIDATE_END;
  values: ResourceType[];
};

export type Actions = InitAction | SetUrlAction | SetDescAction | RemoveAction
  | InvalidateBeginAction | InvalidateEndAction;

export const init = ({ resources }: Omit<InitAction, 'type'>) => ({ resources, type: ActionTypes.INIT });
export const setUrl = ({ key, url }: Omit<SetUrlAction, 'type'>) => ({ key, url, type: ActionTypes.SET_URL });
export const setDesc = ({ key, description }: Omit<SetDescAction, 'type'>) => ({
  key,
  description,
  type: ActionTypes.SET_DESC,
});
export const remove = (key: number) => ({ key, type: ActionTypes.REMOVE });

export const invalidate = {
  begin: () => ({ type: ActionTypes.INVALIDATE_BEGIN }),
  end: ({ values }: Omit<InvalidateEndAction, 'type'>) => ({ values, type: ActionTypes.INVALIDATE_END }),
};
