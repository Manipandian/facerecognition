import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
// import { createLogger } from 'redux-logger';
import thunkMiddleWare from 'redux-thunk';
import { storeURL, updateOperation} from './Redux/reducers';
import './index.css';
import App from './App';

const rootReducer = combineReducers({storeURL, updateOperation});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare));

ReactDOM.render(
  <Provider store={store}>
    <App />
 </Provider>,
  document.getElementById('root')
);
