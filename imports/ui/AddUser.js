import React from 'react';

import {userKarma} from '../api/userKarma';
import { Meteor } from 'meteor/meteor';

export default class AddUser extends React.Component {

    handleInsertion(userName, alias) {
        userKarma.insert({
            name: userName,
            alias: alias || userName,
            karma: this.props.karma,
            owner: Meteor.userId()
        });
    }

    handleSubmission(e) {
        let userName = e.target.UserName.value;
        let alias = e.target.Alias.value;

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
            <div>
                <form onSubmit={this.handleSubmission.bind(this)}>
                    <div>
                        <input type="text" name="UserName" placeholder="User"></input>  
                    </div>
                    <div>
                        <input type="text" name="Alias" placeholder="Nickname"></input>
                    </div>
                    <button>Create User</button>
                </form>
            </div>
        )
    }

}