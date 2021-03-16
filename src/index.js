import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from "redux";
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import counterReducer from "./store/reducers/counter";
import resultReducer from "./store/reducers/result";

const rootReducer = combineReducers({
    ctr: counterReducer,
    res: resultReducer
});

const appStore = createStore(rootReducer);

ReactDOM.render(<Provider store={appStore}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
