import React from 'react';

export default class Room extends React.Component {
    
    onRoomClick = () => {
        this.props.onRoomClick(this.props.room)
    }
    
    render() {
       return <div style={{color: 'white', cursor: 'default'}} onClick={this.onRoomClick}>{this.props.room.name}</div>
    }
}