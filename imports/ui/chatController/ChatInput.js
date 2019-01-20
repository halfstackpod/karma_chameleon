import React from 'react';

export default class ChatInput extends React.Component {

    render() {
        return <input type="text" placeholder="Add Message" onChange={this.props.onChange}/>
    }
}