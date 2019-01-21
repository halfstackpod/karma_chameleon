import React from 'react';

import {userKarma} from '../../api/userKarma';
import '../styles/karma.css';
import { Meteor } from 'meteor/meteor';

export default class AddUser extends React.Component {

    handleInsertion(userName, alias) {
        let toInsert = {
            name: userName,
            alias: alias || userName,
            karma: this.props.karma, //0
            owner: Meteor.userId()
        }
        Meteor.call('userKarma.insert', toInsert);
    }

    handleSubmission(e) {
        let userName = e.target.UserName.value.trim();
        let alias = e.target.Alias.value.trim();

        e.preventDefault();

        if (userName && alias) {
            e.target.UserName.value = "";
            e.target.Alias.value = "";
            this.handleInsertion(userName, alias);
        } else if (userName && !alias) {
            e.target.UserName.value = "";
            this.handleInsertion(userName);
        }
    }

    render() {
        return (
            <div className="ui four column grid create-user-form-wrap">
                <form onSubmit={this.handleSubmission.bind(this)} className="ui form">
                    <div className="field">
                        <input type="text" name="UserName" placeholder="User"></input>  
                    </div>
                    <div className="field">
                        <input type="text" name="Alias" placeholder="Nickname"></input>
                    </div>
                    <button className="ui button">Create User</button>
                </form>
            </div>
        )
    }

}