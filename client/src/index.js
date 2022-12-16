import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import { absenceReducer } from './redux/reducer.js';
import AbsenceSaga from './redux/sagas';
import configureStore from './app/store';
import { Provider } from 'react-redux';

const options = {
  reducers: {
    absence: absenceReducer
  },
  sagasActionWatcher: AbsenceSaga
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={configureStore(options)}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
