import { applyMiddleware, createStore, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {enableBatching} from 'redux-batched-actions';
import {composeWithDevTools} from 'redux-devtools-extension';


export const sagaMiddleWare = createSagaMiddleware();

export default function  configureStore(options) {
const middlewares = [sagaMiddleWare];
const middlewareEnhancer = applyMiddleware(...middlewares);
const rootReducer = (asyncReducers = {}) => enableBatching(combineReducers({ ...asyncReducers, 
    ...(options?.reducers || {})}));
const composeEnhancers = composeWithDevTools({trace: true});
const withDevTools = composeEnhancers(middlewareEnhancer);
const store = createStore(rootReducer(), options?.initialState,withDevTools);
store.asyncReducers = {};
store.injectReducer = (key, reducer) => {
    store.asyncReducers[key] = reducer;
    store.replaceReducer(rootReducer(store.asyncReducers));
    return store;
};

//sagas injected
const injectedSagas = new Map();
const isInjected = (key) => injectedSagas.has(key);
store.injectSaga = (key,saga) => {
    if(isInjected(key)) {
        return; 
    }
    const task = sagaMiddleWare.run(saga);
    injectedSagas.set(key,task);
};
store.injectSaga('root', options?.sagasActionWatcher);
return store;
}
