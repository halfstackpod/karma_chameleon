import React from 'react';
import User from './User';

const UserList = (props) => {
    return props.users.map((user) => {
        return <User key={user._id} user={user} />;
    });
};

export default UserList;