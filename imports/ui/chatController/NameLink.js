import React from 'react';

const NameLink = (props) => {
    if (props.userList && props.userList.length > 0) {
        return names = props.userList.map((val, i) => {
            return <li className='name-link' key={i} onClick={props.onNameLinkClick}>{val}</li>
        });
    }
    return null;
}

export default NameLink;