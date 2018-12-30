import React from 'react';

import { userKarma } from "../api/userKarma";

import AccountsWrapper from "./AccountsWrapper";
import AddUser from './karmaController/AddUser';
import UserList from './karmaController/UserList';
import OrderedView from './karmaController/OrderedView';

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
                    {/* <UserList users={userKarmaList}/> */}
                    <br/>
                    <br/>
                    <OrderedView />
                </div>
            </div>
        );
    }
}