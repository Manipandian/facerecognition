import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunkMiddleWare from 'redux-thunk';
import { storeURL } from './Redux/reducers';
import './index.css';
import App from './App';
import "tachyons"


const logger = createLogger();
const rootReducer = combineReducers({storeURL, });

const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare, logger));

ReactDOM.render(
  <Provider store={store}>
    <App />
 </Provider>,
  document.getElementById('root')
);
