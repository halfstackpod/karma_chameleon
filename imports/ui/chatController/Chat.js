import React from 'react';

import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';

export default class Chat extends React.Component {

    handleFocus = () => {
        this.setState({isActive: true})
    }

    handleChange = (e) => {
        const curText = e.target.value
        curText.slice(-1) == '@' ? this.setState({isActive: true}) : this.setState({isActive: false})
        this.setState({ text: curText })
    }

    render() {
        return (
            <div style={{position: 'relative'}}>
                <ChatWindow room={this.props.activeRoom} />
                <ChatInput 
                    userKarmaList={this.props.userKarmaList}
                    onChatKarmaChange={this.props.onChatKarmaChange}
                    room={this.props.activeRoom}
                />
            </div>
        )
    }
}