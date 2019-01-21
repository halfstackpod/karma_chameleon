import React from 'react';
import reduxThunk from 'redux-thunk';

import TitleBar from './TitleBar';
import { Routes } from './../routes/Routes';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import reducers from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(reduxThunk))
);

export default class App extends React.Component{
    
    render() {
        return (
            <Provider store={store}>
                    <TitleBar />
                    <Routes />
            </Provider>
        );
    }
}
