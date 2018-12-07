import React from 'react';
import ReactDOM from 'react-dom';

import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';

import {Users} from './../imports/api/users';
import App from './../imports/ui/App';

Meteor.startup(() => {
  Tracker.autorun(() => {
    let users = Users.find({}).fetch();
    ReactDOM.render(<App users={users}/>, document.getElementById('app'));
  });
});