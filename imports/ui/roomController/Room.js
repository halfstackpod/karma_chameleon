import React from 'react';

export default class Room extends React.Component {
    
    onRoomClick = () => {
        this.props.onRoomClick(this.props.room)
    }

    getClassNames = () => {
        if (this.props.activeRoom) {
            return "active"
        }
    }
    
    render() {
       return <div style={{color: 'white', cursor: 'default'}} className={this.getClassNames()} onClick={this.onRoomClick}>{this.props.room.name}</div>
    }
}