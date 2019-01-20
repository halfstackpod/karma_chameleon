import React from 'react';

import {Message} from '../../api/chat'

import NameLink from './NameLink'
import ChatWindow from './ChatWindow'
import ChatInput from './ChatInput'

export default class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            messages: [],
            text: ""
        }
    }

    componentDidMount() {
        this.chatTracker = Tracker.autorun(() => {
            Meteor.subscribe('message');
            const messages = Message.find().fetch();
            this.setState({ messages: messages });
        });
    }

    componentWillUnmount() {
        this.chatTracker.stop();
    }

    handleFocus = () => {
        this.setState({isActive: true})
    }

    handleChange = (e) => {
        const curText = e.target.value
        curText.slice(-1) == '@' ? this.setState({isActive: true}) : this.setState({isActive: false})
        this.setState({ text: curText })
    }

    submitMessage = () => {
        this.setState({ text: "" })
        Meteor.call('message.insert', {text: this.state.text})
    }

    render() {
        let showNames
        const userNames = this.props.userKarmaList.map((user, i) => {
            return user.alias
        });
        if (this.state.isActive) {
            showNames = <NameLink userList={userNames}/>
        }
        return (
            <div>
                <ChatWindow messages={this.state.messages} />
                <ChatInput 
                    onChange={(e) => this.handleChange(e)}
                />
                <button onClick={this.submitMessage}>Submit</button>
                {showNames}
            </div>
        )
    }
}