import React from 'react';

import Room from './Room'

export default class RoomList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeRoom: {}
        }
    }

    componentDidMount() {
        this.state.activeRoom = this.props.rooms.length > 0 ? this.props.rooms.length[0]._id : ""
    }

    handleClick = (room) => {
        this.setState({activeRoom: room})
        console.log(room)
    }

    render() {
        return this.props.rooms.map((room) => {
            return <Room 
                key={room._id}
                room={room}
                onClick={this.handleClick}
            />
        })
    }
}