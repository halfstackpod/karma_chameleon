import React from 'react';

import Room from './Room'

export default class RoomList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeRoom: {}
        }
    }

    // componentDidMount() {
    //     this.state.activeRoom = this.props.rooms.length > 0 ? this.props.rooms.length[0]._id : ""
    // }

    render() {
        if (this.props.rooms) {
            return this.props.rooms.map((room) => {
                return <Room 
                    key={room._id}
                    room={room}
                    onRoomClick={this.props.onRoomClick}
                />
            })
        } else {
            return "JOIN A ROOM!"
        }
    }
}