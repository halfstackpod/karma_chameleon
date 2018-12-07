import React from 'react';
import AddUser from './AddUser';

export default class App extends React.Component{
    render() {
        return (
            <div>
                <div>Hello</div>
                <AddUser karma={0}/>
            </div>

        );
    }
}