import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { userKarma } from "../../api/userKarma";
import UserList from './UserList';

export default class  UserListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userKarmaList: []
        }
    }

    componentDidMount() {
        this.karmaTracker = Tracker.autorun(() => {
            Meteor.subscribe('userKarmaPublish');
            const userKarmaList = userKarma.find().fetch();
            console.log(userKarmaList);
            this.setState({ userKarmaList });
        });
    }

    componentWillUnmount() {
        this.karmaTracker.stop();
    }
    
    render() {
        return <UserList userKarmaList={this.state.userKarmaList} />
    }
}