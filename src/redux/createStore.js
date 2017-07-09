import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { autoRehydrate } from 'redux-persist';
import ReduxPersist from '../services/ReduxPersistService';
import { composeWithDevTools } from 'remote-redux-devtools';

import reducers from './';
import sagas from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const enhancers = [
    applyMiddleware(sagaMiddleware),
    autoRehydrate()
];
const composeEnhancers = __DEV__ ? composeWithDevTools({ realtime: true }) : compose;

const store = createStore(
    reducers,
    composeEnhancers(...enhancers)
);

sagaMiddleware.run(sagas);
ReduxPersist.updateReducers(store);

export default store;
