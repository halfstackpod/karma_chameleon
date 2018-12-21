import React from 'react';
import AddUser from './AddUser';
import UserList from './UserList';
import AccountsWrapper from './AccountsWrapper.js';

export default class App extends React.Component{
    render() {
        return (
            <div>
                <div className="loginForm">
                    <AccountsWrapper />
                    <br></br>
                    <br></br>
                </div>
                <div>
                    <div>Hello</div>
                    <AddUser karma={0}/>
                    <UserList users={this.props.users}/>
                </div>
            </div>

        );
    }
}