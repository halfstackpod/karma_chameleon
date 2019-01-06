import React from 'react';

import AccountsWrapper from "./AccountsWrapper";
import AddUser from './karmaController/AddUser';
import OrderedView from './karmaController/OrderedView';

import UserListContainer from './karmaController/UserListContainer';
const Home = () => {
    return (
        <div className="ui container">
            <div className="loginForm">
                <AccountsWrapper />     
                <div style={{height: "45px"}}></div>
            </div>
            <div>
                <AddUser karma={0}/>
                <UserListContainer />
                <div style={{height: "45px"}}></div>
                <OrderedView />
            </div>
        </div>
    );
};

export default Home;