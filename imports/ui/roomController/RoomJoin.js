import React from 'react';

import { Meteor } from 'meteor/meteor';
import { Room } from '../../api/room'

export default class RoomJoin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            roomName: ""
        }
    }

    handleChange = (e) => {
        this.setState({roomName: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            roomName: this.state.roomName,
            userId: Meteor.userId()
        }
        this.state.roomName = ""
        Meteor.call('room.join', data)
    }

    render() {
        return (
            <div>
                <form action="" onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Room Name" onChange={this.handleChange}/>
                    <button type="submit">Join Room</button>
                </form>
            </div>
        )
    }
}