import React from 'react';

import { userKarma } from "../api/userKarma";

import AccountsWrapper from "./AccountsWrapper";
import AddUser from './karmaController/AddUser';
import OrderedView from './karmaController/OrderedView';

import UserListContainer from './karmaController/UserListContainer';
export default class Home extends React.Component{
    render() {
        return (
            <div>
                <div className="loginForm">
                    <AccountsWrapper />
                    <br></br>
                    <br></br>
                </div>
                <div>
                    <br/>
                    <br/>
                    <AddUser karma={0}/>
                    <UserListContainer />
                    <br/>
                    <br/>
                    <OrderedView />
                </div>
            </div>
        );
    }
}