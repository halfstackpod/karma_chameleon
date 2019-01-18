import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { userKarma } from "../../api/userKarma";
import UserList from './UserList';

export default class UserListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userKarmaList: [],
            sorted: ""
        }
    }

    componentDidMount() {
        this.karmaTracker = Tracker.autorun(() => {
            Meteor.subscribe('userKarmaPublish');
            let userKarmaList = userKarma.find().fetch();
            userKarmaList = this.sortUsers(userKarmaList, this.state.sorted);
            console.log(userKarmaList);
            this.setState({ userKarmaList });
        });
    }

    componentWillUnmount() {
        this.karmaTracker.stop();
    }

    sortUsers = (list, sortedValue) => {
        let sortedList = [];
        if (sortedValue === "top" || !sortedValue) {
            sortedList = this.getTopUsers(list)
        } else if (sortedValue === "bottom") {
            sortedList = this.getBottomUsers(list)
        } else if (sortedValue === "alpha") {
            sortedList = this.getAlphabeticalUsers(list)
        }
        this.setState({sorted: sortedValue});
        return sortedList;
    }

    sortUsersChange = (event) => {
        const userKarmaList = this.state.userKarmaList
        this.sortUsers(userKarmaList, event.target.value)
    }

    getAlphabeticalUsers = (list) => {
        return list.sort((u1, u2) => {
            const name1 = u1.alias.toLowerCase()
            const name2 = u2.alias.toLowerCase()
            if (name1 < name2) {
                return -1
            } else if (name1 > name2) {
                return 1
            } else {
                return 0
            }
        });
    }

    getTopUsers = (list) => {
        return list.sort((u1, u2) => {
            return u2.karma - u1.karma
        });
    }

    getBottomUsers = (list) => {
        return list.sort((u1, u2) => {
            return u1.karma - u2.karma
        });
    }
    
    render() {
        return (
            <div>
                <div>
                    <select type="select" onChange={this.sortUsersChange}>
                        <option value="top">Top Users</option>
                        <option value="bottom">Bottom Users</option>
                        <option value="alpha">Alphabetical</option>
                    </select>
                </div>
                <UserList 
                    userKarmaList={this.state.userKarmaList}
                />
            </div>
        )
    }
}