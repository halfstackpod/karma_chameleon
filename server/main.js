import { Meteor } from 'meteor/meteor';
import {Users} from './../imports/api/users';

Meteor.startup(() => {
  // code to run on server at startup
  console.log(Users.find().fetch());
});
