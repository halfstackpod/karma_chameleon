import React from 'react';
import Logout from './Logout';

const TitleBar = () => {


    return (
        <div>
            <div className="ui container title">
                <h1> Welcome to Karma Chameleon</h1>

                <h3>Enjoy your stay and don't overflow the int</h3>
            </div>
            <div className="logout">
                <Logout />
            </div>
        </div>
    );
};

export default TitleBar;