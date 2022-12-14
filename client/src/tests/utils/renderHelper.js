import { render as rtlRender } from "@testing-library/react";
import React from 'react';
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import createSagaMiddleware from 'redux-saga';

export function renderWithSagaAndStore(
  ui,
  reducers = {},
  sagasInjected,
  {
    preLoadedState,
    store = setUpStore(reducers, preLoadedState, sagasInjected),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
        <Provider store={store}>{children}</Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

function setUpStore(reducers,preLoadedState,sagasInjected) {
    const composeEnhancers = compose;
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    const enhancers = [applyMiddleware(...middlewares)];
    const store = createStore(combineReducers(reducers),preLoadedState,composeEnhancers(...enhancers));
    store.runSaga = sagaMiddleware.run;
    store.injectedReducers = {};
    store.injectedSagas = {};
    if(sagasInjected?.sagas) {
        sagaMiddleware.run(sagasInjected.sagas);
    }
    return store;
}


