import React from 'react';

import UserList from './UserList';

export default class UserListContainer extends React.Component {

    render() {
        return (
            <div>
                <div>
                    <select type="select" onChange={this.props.onSort}>
                        <option value="top">Top Users</option>
                        <option value="bottom">Bottom Users</option>
                        <option value="alpha">Alphabetical</option>
                    </select>
                </div>
                <UserList 
                    userKarmaList={this.props.userKarmaList}
                />
            </div>
        )
    }
}