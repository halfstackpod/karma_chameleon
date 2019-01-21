import React from 'react';

import NameLink from './NameLink';
import { Meteor } from 'meteor/meteor';

export default class ChatInput extends React.Component {
    state = {
        isActive: false,
        text: '',
        userList: []
    };

    handleChange = (e) => {
        const curText = e.target.value;

        if (curText.slice(-1) == '@') {
            const userNames = this.props.userKarmaList.map((user) => {
                return user.alias;
            });
            this.setState({isActive: true, text: curText, userList: userNames});
        } else {
            this.setState({isActive: false, text: curText, userList: []});
        }
    }

    submitMessage = (e) => {
        e.preventDefault();
        let messageTime = new Date();
        let timestamp = 'at ' + (messageTime.getMonth() + 1) + `/${messageTime.getDate()}/${messageTime.getFullYear()} ${messageTime.getHours()}:${messageTime.getMinutes()}:`;
        let messageText = this.state.text.trim();
        this.setState({ text: '' });
        Meteor.call('message.insert', {text: messageText, timestamp, author: Meteor.user().username});
    }

    render() {
        return (
            <React.Fragment>
                <form className="ui form" onSubmit={this.submitMessage}>
                    <div className="field">
                        <input type="text" placeholder="Add Message" value={this.state.text} onChange={this.handleChange}/>
                        <button className="ui button primary" type="submit">Submit</button>
                    </div>
                </form>
                <div>
                    <ul>
                        <NameLink userList={this.state.userList} />
                    </ul>
                </div>
            </React.Fragment>
        );
    }
}