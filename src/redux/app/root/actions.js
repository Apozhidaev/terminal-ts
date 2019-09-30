import { action, actionType, flowType, APP, ROOT } from '../../redux-utils';

const newType = type => actionType(APP, ROOT, type);
const newFlowType = type => flowType(newType(type));

export const SEARCH = newType('SEARCH');
export const SHOW_MORE = newType('SHOW_MORE');
export const INVALIDATE = newFlowType('INVALIDATE');

export const search = query => action(SEARCH, { query });
export const showMore = () => action(SHOW_MORE);

export const invalidate = {
  begin: () => action(INVALIDATE.BEGIN),
  end: slots => action(INVALIDATE.END, { slots }),
};
