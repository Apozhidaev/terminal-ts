import { combineReducers } from "redux";
import app, { AppStateType } from "./app/reducer";
import model, { ModelStateType } from "./model/reducer";
import services, { ServiceStateType } from "./services/reducer";

export type StateType = {
  app: AppStateType,
  model: ModelStateType,
  services: ServiceStateType,
};

const root = combineReducers({
  app,
  model,
  services,
});

export default root;
