import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";

import './index.css';
import App from './App';
import burgerBuilderReducer from "./store/reducers/burgerBuilder";
import orderReducer from "./store/reducers/order";
import authReducer from "./store/reducers/auth";
import reportWebVitals from './reportWebVitals';

//import { logoutSaga } from "./store/sagas/auth";
import { watchAuth, wathBurgerBuilder, watchOrder } from "./store/sagas/index";

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
});

const sagaMiddleware = createSagaMiddleware({});

const appStore = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

//sagaMiddleware.run(logoutSaga);
sagaMiddleware.run(watchAuth);
sagaMiddleware.run(wathBurgerBuilder);
sagaMiddleware.run(watchOrder);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={appStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
