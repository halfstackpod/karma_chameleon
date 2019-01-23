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
            this.setState({isActive: false, text: curText});
        }
    }

    submitMessage = (e) => {
        e.preventDefault();
        let messageTime = new Date();
        let timestamp = 'at ' + (messageTime.getMonth() + 1) + `/${messageTime.getDate()}/${messageTime.getFullYear()} ${messageTime.getHours()}:${messageTime.getMinutes()}:`;
        let messageText = this.state.text.trim();
        this.setState({ text: '' });
        Meteor.call('message.insert', {text: messageText, timestamp, author: Meteor.user().username});
        this.props.onChatKarmaChange(this.state.text);
    }

    renderUserList = () => {
        if (this.state.isActive) {
            return (
                <div style={{position: 'absolute', zIndex: 1, border: '1px solid black', background: 'white', left: '30px', bottom: '74px'}}>
                    <ul style={{listStyle: 'none', padding: '0px 10px'}}>
                        <NameLink userList={this.state.userList} onNameLinkClick={this.handleNameLinkClick}/>
                    </ul>
                </div>
            )
        }
    }

    handleNameLinkClick = (e) => {
        var textWithName = this.state.text + e.target.textContent
        this.setState({text: textWithName, isActive: false})
    }

    render() {
        return (
            <React.Fragment>
                {this.renderUserList()}
                <form className="ui form" onSubmit={this.submitMessage}>
                    <div className="field">
                        <input type="text" placeholder="Add Message" value={this.state.text} onChange={this.handleChange}/>
                        <button className="ui button primary" type="submit">Submit</button>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}