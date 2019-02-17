import React from 'react';

import { Meteor } from 'meteor/meteor';
import { Room } from '../../api/room'
import RoomForm from './RoomForm';
import RoomList from './RoomList'
import RoomJoin from './RoomJoin'

export default class RoomContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rooms: []
        }
    }

    componentDidMount() {
        this.roomTracker = Tracker.autorun(() => {
            Meteor.subscribe('room');
            const rooms = Room.find().fetch();
            this.setState({ rooms: rooms });
        });
    }

    componentWillUnmount() {
        this.roomTracker.stop();
    }

    render() {
        return (
            <div style={{position: 'relative', height: '100%', width: '200px'}}>
                <RoomJoin />
                <div style={{background: 'black'}}>
                    <RoomForm />
                    <div style={{color: 'white', fontSize: '24px', margin: '15px 0px', textDecoration: 'underline'}}>Rooms</div>
                    <RoomList rooms={this.state.rooms}/>
                </div>
            </div>
        )
    }
}