import React from 'react';
import UserCard from './UserCard';

const UserList = (props) => {
    if (props.userKarmaList && props.userKarmaList.length > 0) {
        return props.userKarmaList.map((user) => {
            return <UserCard key={user._id} user={user} />;
        });
    } else {
        return (
            <div>
                <p>No Valid Users Yet</p>
            </div>
        )
    }
};

export default UserList;