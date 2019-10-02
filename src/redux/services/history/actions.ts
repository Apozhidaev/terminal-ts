export enum ActionTypes {
  NAVIGATE = 'SERVICES_HISTORY_NAVIGATE',
  BACK = 'SERVICES_HISTORY_BACK',
}

export type NavigateAction = {
  type: ActionTypes.NAVIGATE;
  path: string;
  replace?: boolean;
};

export const navigate = ({ path, replace = false }: Omit<NavigateAction, 'type'>) => ({
  path,
  replace,
  type: ActionTypes.NAVIGATE,
});
export const back = () => ({ type: ActionTypes.BACK });
export const goRoot = () => navigate({ path: '/' });
export const goEdit = (id: number) => navigate({ path: `/edit/${id}` });
export const goCreate = (parentId?: number) => navigate({ path: parentId ? `/new/${parentId}` : '/new' });
