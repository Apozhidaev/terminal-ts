import { combineReducers } from 'redux';
import backup, { BackupStateType } from './backup/reducer';
import storage, { StorageStateType } from './storage/reducer';

export type ServiceStateType = {
  backup: BackupStateType,
  storage: StorageStateType,
};

const services = combineReducers({
  backup,
  storage,
});

export default services;
