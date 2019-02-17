import React from 'react';

Message = (props) => {
    return (
        <div>
            <span style={{fontWeight: 'bold'}}>{props.msg.author} </span>
            <span>{props.msg.timestamp} </span>
            <span> {props.msg.text}</span>
        </div>
    )
}
export default class ChatWindow extends React.Component {

    render() {
        let messages = [];
        if (this.props.room && this.props.room.messages) {
            messages = this.props.room.messages.map((msg) => {
                return (
                    <Message key={msg.epoch} msg={msg} />
                )
            })
        }
        return (
            <div style={{width: '100%', height: '400px', border: '1px solid black', overflowY: 'scroll'}}>
                {messages}
            </div>
        )
    }
}