import { combineReducers } from 'redux';
import backup from './backup/reducer';
import storage from './storage/reducer';


const services = combineReducers({
  backup,
  storage,
});

export default services;
