import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { userKarma } from "../../api/userKarma";
import UserList from './UserList';

export default class UserListContainer extends React.Component {
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

    getTopUsers = () => {
        const orderedList = this.state.userKarmaList.sort((u1, u2) => {
            return u2.karma - u1.karma
        });
        this.setState({userKarmaList: orderedList})
    }

    getBottomUsers = () => {
        const orderedList = this.state.userKarmaList.sort((u1, u2) => {
            return u1.karma - u2.karma
        });
        this.setState({userKarmaList: orderedList})
    }
    
    render() {
        return (
            <div>
                <UserList 
                    userKarmaList={this.state.userKarmaList}
                />
                <div className="TopUsers">
                    <button type="button" onClick={this.getTopUsers}>
                        Top Users!
                    </button>
                    <button type="button" onClick={this.getBottomUsers}>
                        Bottom Users!
                    </button>
                </div>
            </div>
        )
    }
}