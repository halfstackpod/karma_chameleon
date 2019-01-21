import React from 'react';

import {Message} from '../../api/chat';

import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import { Meteor } from 'meteor/meteor';

export default class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: []
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
        return (
            <div>
                <ChatWindow messages={this.state.messages} />
                <ChatInput userKarmaList={this.props.userKarmaList} />
            </div>
        )
    }
}