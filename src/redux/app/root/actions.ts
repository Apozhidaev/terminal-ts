export enum ActionTypes {
  SEARCH = 'APP_ROOT_SEARCH',
  SHOW_MORE = 'APP_ROOT_SHOW_MORE',
  INVALIDATE_BEGIN = 'APP_ROOT_INVALIDATE_BEGIN',
  INVALIDATE_END = 'APP_ROOT_INVALIDATE_END',
}

type InvalidateParams = {
  slots: any[];
};

type SearchAction = {
  type: ActionTypes.SEARCH;
  query: string;
};

type ShowMoreAction = {
  type: ActionTypes.SHOW_MORE;
  query: string;
};

type InvalidateBeginAction = {
  type: ActionTypes.INVALIDATE_BEGIN;
  id: number
};

type InvalidateEndAction = InvalidateParams & {
  type: ActionTypes.INVALIDATE_END;
};

export type Actions = SearchAction | ShowMoreAction
  | InvalidateBeginAction | InvalidateEndAction;

export const search = (query: string) => ({ query, type: ActionTypes.SEARCH });
export const showMore = () => ({ type: ActionTypes.SHOW_MORE });

export const invalidate = {
  begin: () => ({ type: ActionTypes.INVALIDATE_BEGIN }),
  end: (slots: any[]) => ({ slots, type: ActionTypes.INVALIDATE_END }),
};
