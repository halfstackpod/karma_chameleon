import React from 'react';
import reduxThunk from 'redux-thunk';

import TitleBar from './TitleBar';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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
        karma: "" //figure out how to get {this.props.karma} into this
    },
    {
        path: "*",
        component: NotFound
    }
];

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
                    <Router >
                        <Switch >
                            {routes.map((route, i) => (
                                <RenderRoutes key={route.path} {...route} />
                            ))}

                            {/* {routes.map( ({path, component:C}) => (
                                <Route key={path} path={path} render={(props) => <C {...props} /> } />
                            ))} */}

                            {/* {routes.map( ({ path, component: C  }) => 
                                (
                                    <Route
                                        path = {path}
                                        render = {(props) =>  <C {...props} /> } 
                                    />
                                )
                            )} */}
                        </Switch>
                    </Router>
            </Provider>
        );
    }
}
