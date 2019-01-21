import React from 'react';

export default class NameLink extends React.Component {

    render() {
        let messages = this.props.messages.map((msg) => {
            return <div>{msg.text}</div>
        });
        return (
            <div style={{width: '300px', height: '100px', border: '1px solid black', overflow: 'scroll'}}>
                {messages}
            </div>
        )
    }
}