import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import counterReducer from "./store/reducers/counter";
import resultReducer from "./store/reducers/result";

const middleware = [];

const logger = (store) => {
    return next => {
        return action => {
            console.log("[Middleware] Dispatching", action);
            const result = next(action);
            console.log("[Middleware] next state", store.getState());
            return result;
        };
    };
};

middleware.push(logger);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    ctr: counterReducer,
    res: resultReducer
});

//const appStore = createStore(rootReducer, applyMiddleware(logger));
const appStore = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));

ReactDOM.render(<Provider store={appStore}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
