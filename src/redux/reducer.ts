import { combineReducers } from 'redux';
import app, { AppSateType } from './app/reducer';
import model, { ModelStateType } from './model/reducer';
import services from './services/reducer';

export type SateType = {
  app: AppSateType,
  model: ModelStateType,
  services: any,
};

const root = combineReducers({
  app,
  model,
  services,
});

export default root;
