
import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

export default class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
        }
    }

    componentDidMount() {
        this.authTracker = Tracker.autorun(() => {
            this.setState({ authenticated: !! Meteor.userId() });
        });
    }

    componentWillUnmount() {
        this.authTracker.stop();
    }
    
    render() {
        return (
            this.state.authenticated ? 
            <button onClick={() => { Accounts.logout() }}> Logout </button> 
            : 
            <div></div>
        )
    }
}