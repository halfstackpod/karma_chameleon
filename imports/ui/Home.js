import React from 'react';

import AccountsWrapper from "./AccountsWrapper";
import AddUser from './karmaController/AddUser';

import UserListContainer from './karmaController/UserListContainer';

import Chat from './chatController/Chat';
import './styles/karma.css';

import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { userKarma } from "../api/userKarma";
export default class Home extends React.Component {
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
            const userKarmaList = this.sortUsers(userKarma.find().fetch(), this.state.sorted);
            this.setState({ userKarmaList });
        });
    }

    componentWillUnmount() {
        this.karmaTracker.stop();
    }

    handleSort = (event) => {
        const userKarmaList = this.state.userKarmaList
        this.sortUsers(userKarmaList, event.target.value)
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

    getUserNames = () => {
        return this.state.userKarmaList.map((user) => {
            return user.alias;
        });
    }

    handleChatKarmaChange = (text) => {
        const karmaPattern = new RegExp(/@(\w+)([+-]+)/)
        const karmaMatch = text.match(karmaPattern)
        if (karmaMatch && karmaMatch.length > 2) {
            const userName = karmaMatch[1]
            if (this.getUserNames().indexOf(karmaMatch[1]) >= 0) {
                const addsOrSubs = karmaMatch[2]
                const userKarmaList = this.state.userKarmaList
                userKarmaList.filter((user) => {
                    if (user.alias === userName) {
                        addsOrSubs[0] === '+' ? user.karma += addsOrSubs.length : user.karma -= addsOrSubs.length
                        this.setState({userKarmaList: userKarmaList})
                        return user
                    }
                });
            }
        }
    }
    
    render() {
        return (
            <React.Fragment>
                <div className="ui container grid">
                    <AddUser karma={0}/>
                </div>
                <div className="ui container">
                    <div className="loginForm">
                        <AccountsWrapper />     
                        <div style={{height: "45px"}}></div>
                    </div>
                </div>
                <div className="ui container two column grid">
                    <div className="ui column">                        
                        <div>                        
                            <UserListContainer 
                                userKarmaList={this.state.userKarmaList}
                                onSort={(event) => this.handleSort(event)}
                            />
                        </div>
                    </div>
                    <div className="ui column">
                        <Chat userKarmaList={this.state.userKarmaList} onChatKarmaChange={this.handleChatKarmaChange}/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
};