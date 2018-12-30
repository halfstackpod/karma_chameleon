import React from 'react';

import AddUser from './AddUser';
import UserList from './UserList';
import AccountsWrapper from './AccountsWrapper';

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
                    <div>Hello</div>
                    <AddUser karma={0}/>
                    {/* <UserList users={this.props.karma}/> */}
                </div>
            </div>
        );
    }
}