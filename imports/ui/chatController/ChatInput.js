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
        const formatedTime = moment().format('l h:mm');
        const timestamp = 'at ' + formatedTime + `:`;
        let messageText = this.state.text.trim();
        this.setState({ text: '' });
        Meteor.call('room.message.create', {
            roomId: this.props.room._id,
            msg: {
                text: messageText, 
                timestamp: timestamp, 
                author: Meteor.user().username,
                epoch: Date.now()
            }
        });
        this.props.onChatKarmaChange(this.state.text);
    }

    renderUserList = () => {
        // TODO: change so key is _id
        const nameLinks = this.state.userList.map((name, i) => {
            return <NameLink key={name} name={name} onNameLinkClick={this.handleNameLinkClick}/>
        });
        if (this.state.isActive) {
            return (
                <div style={{position: 'absolute', zIndex: 1, border: '1px solid black', background: 'white', left: '30px', bottom: '74px'}}>
                    <ul style={{listStyle: 'none', padding: '0px 10px'}}>
                        {nameLinks}
                    </ul>
                </div>
            )
        }
    }

    handleNameLinkClick = (e) => {
        const textWithName = this.state.text + e.target.textContent
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