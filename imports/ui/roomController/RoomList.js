import React from 'react';
import Room from './Room'

export default class RoomList extends React.Component {

    isActiveRoom = (id) => {
        return id === this.props.activeRoom._id
    }

    render() {
        if (this.props.rooms) {
            return this.props.rooms.map((room) => {
                return <Room 
                    key={room._id}
                    room={room}
                    onRoomClick={this.props.onRoomClick}
                    activeRoom={this.isActiveRoom(room._id)}
                />
            })
        } else {
            return "JOIN A ROOM!"
        }
    }
}