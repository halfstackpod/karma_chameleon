import React from 'react';
import UserCard from './UserCard';

const UserList = (props) => {
    return props.users.map((user) => {
        return <UserCard key={user._id} user={user} />;
    });
};

export default UserList;