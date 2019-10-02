import { KeyValue } from '../storage/saga/utils';

export enum ActionTypes {
  GET_PROFILE_REQUEST = 'SERVICES_BACKUP_GET_PROFILE_REQUEST',
  GET_PROFILE_SUCCESS = 'SERVICES_BACKUP_GET_PROFILE_SUCCESS',
  GET_PROFILE_FAILURE = 'SERVICES_BACKUP_GET_PROFILE_FAILURE',
  GET_STORAGE_REQUEST = 'SERVICES_BACKUP_GET_STORAGE_REQUEST',
  GET_STORAGE_SUCCESS = 'SERVICES_BACKUP_GET_STORAGE_SUCCESS',
  GET_STORAGE_FAILURE = 'SERVICES_BACKUP_GET_STORAGE_FAILURE',
  SYNC_STORAGE_REQUEST = 'SERVICES_BACKUP_SYNC_STORAGE_REQUEST',
  SYNC_STORAGE_SUCCESS = 'SERVICES_BACKUP_SYNC_STORAGE_SUCCESS',
  SYNC_STORAGE_FAILURE = 'SERVICES_BACKUP_SYNC_STORAGE_FAILURE',
}

export type ProfileRequestAction = {
  type: ActionTypes.GET_PROFILE_REQUEST;
  name: string,
  password: string;
};

export type ProfileSuccessAction = {
  type: ActionTypes.GET_PROFILE_SUCCESS;
  profile: { token: string };
};

export type ProfileFailureAction = {
  type: ActionTypes.GET_PROFILE_FAILURE;
  error: Error;
};

export type StorageRequestAction = {
  type: ActionTypes.GET_STORAGE_REQUEST;
  token: string;
};

export type StorageSuccessAction = {
  type: ActionTypes.GET_STORAGE_SUCCESS;
  sync: number;
  keyValues: KeyValue[];
};

export type StorageFailureAction = {
  type: ActionTypes.GET_STORAGE_FAILURE;
  error: Error;
};

export type SyncStorageRequestAction = {
  type: ActionTypes.SYNC_STORAGE_REQUEST;
  sync: number;
  keyValues: KeyValue[];
};

export type SyncStorageSuccessAction = {
  type: ActionTypes.SYNC_STORAGE_SUCCESS;
  sync: number;
  keyValues: KeyValue[];
  syncedKeys: KeyValue[];
};

export type SyncStorageFailureAction = {
  type: ActionTypes.SYNC_STORAGE_FAILURE;
  error: Error;
};

export type Actions = ProfileRequestAction | ProfileSuccessAction | ProfileFailureAction
  | StorageRequestAction | StorageSuccessAction | StorageFailureAction
  | SyncStorageRequestAction | SyncStorageSuccessAction | SyncStorageFailureAction;

export const getProfile = {
  request: ({ name, password }: Omit<ProfileRequestAction, 'type'>) => ({
    name,
    password,
    type: ActionTypes.GET_PROFILE_REQUEST,
  }),
  success: (profile: any) => ({ profile, type: ActionTypes.GET_PROFILE_SUCCESS }),
  failure: (error: Error) => ({ error, type: ActionTypes.GET_PROFILE_FAILURE }),
};

export const getStorage = {
  request: ({ token }: Omit<StorageRequestAction, 'type'>) => ({
    token,
    type: ActionTypes.GET_STORAGE_REQUEST,
  }),
  success: ({ sync, keyValues }: Omit<StorageSuccessAction, 'type'>) => ({
    sync,
    keyValues,
    type: ActionTypes.GET_STORAGE_SUCCESS,
  }),
  failure: (error: Error) => ({
    error,
    type: ActionTypes.GET_STORAGE_FAILURE,
  }),
};

export const syncStorage = {
  request: ({ sync, keyValues }: Omit<SyncStorageRequestAction, 'type'>) => ({
    sync,
    keyValues,
    type: ActionTypes.SYNC_STORAGE_REQUEST,
  }),
  success: ({ sync, keyValues, syncedKeys }: Omit<SyncStorageSuccessAction, 'type'>) => ({
    sync,
    keyValues,
    syncedKeys,
    type: ActionTypes.SYNC_STORAGE_SUCCESS,
  }),
  failure: (error: Error) => ({
    error,
    type: ActionTypes.SYNC_STORAGE_FAILURE,
  }),
};
