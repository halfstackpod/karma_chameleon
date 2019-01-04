import React from 'react';
import reduxThunk from 'redux-thunk';

import TitleBar from './TitleBar';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Route, Switch } from "react-router-dom";

import History from './../api/history';

import reducers from '../reducers';
import Home from './Home';
import NotFound from './NotFound';
import Signup from './Signup';
import Login from './Login';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(reduxThunk))
);

const routes = [
    {
        path: "/",
        exact: "true",
        component: Login

    },
    {
        path: "/signup",
        component: Signup
    },
    {
        path: "/home",
        component: Home,
    },
    {
        path: "*",
        component: NotFound
    }
];

const authPaths = ["/home"];
const unAuthPaths = ["/", "/signup"];

const RenderRoutes = (route) => {
    return (
        <Route path={route.path} render={props => (
            <route.component {...props} routes={route.routes} />
        )}/>
    );
}

export default class App extends React.Component{
    
    render() {
        return (

            <Provider store={store}>
                    <TitleBar />
                    <Router history={History}>
                        <Switch >
                            {routes.map((route, i) => (
                                <RenderRoutes key={route.path} {...route} />
                            ))}
                        </Switch>
                    </Router>
            </Provider>
        );
    }
}

export const AuthChange = function(authenticated) {
    const path = window.location.pathname;
    const isPrivate = authPaths.includes(path);
    const isPublic = unAuthPaths.includes(path);

    if (isPrivate && !authenticated ) {
        console.log("Not Logged in - redirecting to login page");
        History.push("/");
    } else if (isPublic && authenticated) {
        console.log("Logged in - redirecting to home page");
        History.push("/home");
    }
}
