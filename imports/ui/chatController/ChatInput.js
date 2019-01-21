import React from 'react';

import NameLink from './NameLink';

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
        this.setState({ text: '' });
        Meteor.call('message.insert', {text: this.state.text});
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