import React from 'react';
import AddUser from './AddUser';
import UserList from './UserList';

export default class App extends React.Component{
    render() {
        return (
            <div>
                <div>Hello</div>
                <AddUser karma={0}/>
                <UserList users={this.props.users}/>
            </div>

        );
    }
}