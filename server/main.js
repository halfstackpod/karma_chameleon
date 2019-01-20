import { Meteor } from 'meteor/meteor';
import {userKarma} from './../imports/api/userKarma';
import {Message} from '../imports/api/chat'

Meteor.startup(() => {
// code to run on server at startup
    console.log("USER KARMA!");
    console.log(userKarma.find().fetch());
    console.log("Meteor users");
    console.log(Meteor.users.find().fetch());
});