import React from 'react';

import {userKarma} from '../../api/userKarma';
import { Meteor } from 'meteor/meteor';

export default class AddUser extends React.Component {

    handleInsertion(userName, alias) {
        userKarma.insert({
            name: userName,
            alias: alias || userName,
            karma: this.props.karma,
            owner: Meteor.userId()
        });

        // Meteor.users.update({ _id: Meteor.user()._id}, { $set: { hasKarma: true} });
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
        //Todo if user has already created a karmaUser then return null
        //see UserListContainer + UserList for info on how to set up tracker
        //when autopublish is removed - required that we set up subscription to replace
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