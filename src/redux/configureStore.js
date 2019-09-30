import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer';
import rootSaga from './saga';


export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const logger = createLogger({
    level: 'info',
    collapsed: true,
  });
  return {
    ...createStore(rootReducer, applyMiddleware(sagaMiddleware, logger)),
    runSaga: () => sagaMiddleware.run(rootSaga),
  };
}
