import React from 'react';

import AddUser from './karmaController/AddUser';
import UserListContainer from './karmaController/UserListContainer';
import Chat from './chatController/Chat';
import RoomContainer from './roomController/RoomContainer'

import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { userKarma } from "../api/userKarma";
import { Room } from "../api/room"

import './styles/karma.css';
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userKarmaList: [],
            sorted: "",
            activeRoom: "",
            rooms: ""
        }
    }

    componentDidMount() {
        this.karmaTracker = Tracker.autorun(() => {
            Meteor.subscribe('userKarmaPublish');
            const userKarmaList = this.sortUsers(userKarma.find().fetch(), this.state.sorted);
            this.setState({ userKarmaList });
        });

        this.roomTracker = Tracker.autorun(() => {
            Meteor.subscribe('room')
            const rooms = Room.find().fetch()
            console.log("ROOMS:" + rooms)
            const activeRoom = rooms[0]
            this.setState({ rooms, activeRoom })
        });
    }

    componentWillUnmount() {
        this.karmaTracker.stop();
        this.roomTracker.stop();
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

    conditionalRenderAddUser = () => {
        if (this.state.userKarmaList.length > 0) {
            let filtered = this.state.userKarmaList.filter((ele) => {
                return ele.owner === Meteor.userId()
            });
            if (filtered.length === 0) {
                return (<AddUser karma={0} />)
            } else {
                return (<AddUser display={"none"} />)
            }
        }
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

    handleRoomClick = (room) => {
        this.setState({activeRoom: room})
        console.log(room)
    }
    
    render() {
        return (
            <React.Fragment>
                <div className="ui container three column grid newKarmaUser">
                    <div className="ui column">
                        {this.conditionalRenderAddUser()}
                    </div>
                </div>
                <div className="ui container three column grid">
                    <div className="ui column">
                        <RoomContainer 
                            userKarmaList={this.state.userKarmaList}
                            activeRoom={this.state.activeRoom}
                            rooms={this.state.rooms} 
                            onRoomClick={this.handleRoomClick}
                        />
                    </div>
                    <div className="ui column">                    
                        <div>                        
                            <UserListContainer 
                                userKarmaList={this.state.userKarmaList}
                                onSort={(event) => this.handleSort(event)}
                            />
                        </div>
                    </div>
                    <div className="ui column">
                        <Chat userKarmaList={this.state.userKarmaList} activeRoom={this.state.activeRoom} onChatKarmaChange={this.handleChatKarmaChange}/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
};