import {
  action,
  actionType,
  SERVICES,
  HISTORY,
} from '../../redux-utils';

const newType = (type) => actionType(SERVICES, HISTORY, type);

export const NAVIGATE = newType('NAVIGATE');
export const BACK = newType('BACK');

export const navigate = ({ path, replace }) => action(NAVIGATE, { path, replace });
export const back = () => action(BACK);
export const goRoot = () => navigate({ path: '/' });
export const goEdit = (id) => navigate({ path: `/edit/${id}` });
export const goCreate = (parentId) => navigate({ path: parentId ? `/new/${parentId}` : '/new' });
