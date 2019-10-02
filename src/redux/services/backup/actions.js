import {
  action,
  fetchType,
  SERVICES,
  BACKUP,
} from '../../redux-utils';

const newFetchType = (type) => fetchType(SERVICES, BACKUP, type);

export const GET_PROFILE = newFetchType('GET_PROFILE');
export const GET_STORAGE = newFetchType('GET_STORAGE');
export const SYNC_STORAGE = newFetchType('SYNC_STORAGE');

export const getProfile = {
  request: ({ name, password }) => action(GET_PROFILE.REQUEST, { name, password }),
  success: (profile) => action(GET_PROFILE.SUCCESS, { profile }),
  failure: (error) => action(GET_PROFILE.FAILURE, { error }),
};

export const getStorage = {
  request: ({ token }) => action(GET_STORAGE.REQUEST, { token }),
  success: ({ sync, keyValues }) => action(GET_STORAGE.SUCCESS, { sync, keyValues }),
  failure: (error) => action(GET_STORAGE.FAILURE, { error }),
};

export const syncStorage = {
  request: ({ sync, keyValues }) => action(SYNC_STORAGE.REQUEST, { sync, keyValues }),
  success: ({ sync, keyValues, syncedKeys }) => action(SYNC_STORAGE.SUCCESS, {
    sync,
    keyValues,
    syncedKeys,
  }),
  failure: (error) => action(SYNC_STORAGE.FAILURE, { error }),
};
