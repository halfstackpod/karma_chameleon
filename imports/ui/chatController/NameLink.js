import React from 'react';

const NameLink = (props) => {
    if (props.userList && props.userList.length > 0) {
        return names = props.userList.map((val, i) => {
            return <li key={i}>{val}</li>
        });
    }
    return null;
}

export default NameLink;