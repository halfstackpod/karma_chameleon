import React from 'react';

export default class Room extends React.Component {
    
    onClick = () => {
        this.props.onClick(this.props.room)
    }
    
    render() {
       return <div style={{color: 'white', cursor: 'default'}} onClick={this.onClick}>{this.props.room.name}</div>
    }
}