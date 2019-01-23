import React from 'react';

export default class NameLink extends React.Component {

    render() {
        let messages = this.props.messages.map((msg) => {
            return (
                <div>
                    <span style={{fontWeight: 'bold'}}>{msg.author} </span>
                    <span>{msg.timestamp} </span>
                    <span> {msg.text}</span>
                </div>
            );
        });
        return (
            <div style={{width: '100%', height: '400px', border: '1px solid black', overflowY: 'scroll'}}>
                {messages}
            </div>
        )
    }
}