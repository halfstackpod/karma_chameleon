import React from 'react';

import { Meteor } from 'meteor/meteor';

export default class RoomForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            owner: Meteor.user().username,
            private: false,
            name: this.state.value,
            members: []
        }
        this.state.value = ""
        Meteor.call('room.create', data)
    }

    handleChange = (e) => {
        this.setState({value: e.target.value})
    }

    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Room Name" value={this.state.value} onChange={this.handleChange}/>
                    <button type="submit">Create Room</button>
                </form>
            </React.Fragment>
        )
    }
}