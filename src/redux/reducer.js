import { combineReducers } from 'redux';
import app from './app/reducer';
import model from './model/reducer';
import services from './services/reducer';

const root = combineReducers({
  app,
  model,
  services,
});

export default root;
