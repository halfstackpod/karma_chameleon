import React from 'react';

const NameLink = (props) => {
    return (
        <li className='name-link' onClick={props.onNameLinkClick}>{props.name}</li>
    )
}

export default NameLink;