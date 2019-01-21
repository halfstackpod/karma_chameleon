import React from 'react';
import { Router, Route, Switch } from "react-router-dom";

import History from './../api/history';

import Home from './../ui/Home'
import NotFound from './../ui/NotFound';
import Signup from './../ui/Signup';
import Login from './../ui/Login';

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

export const Routes = () => {
    return (
        <Router history={History}>
            <Switch >
                {routes.map((route, i) => (
                    <RenderRoutes key={route.path} {...route} />
                ))}
            </Switch>
        </Router>
    );
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