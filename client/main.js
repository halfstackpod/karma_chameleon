import React from 'react';
import ReactDOM from 'react-dom';

import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';

import {userKarma} from './../imports/api/userKarma';
// const userKarmaList = userKarma.find({}).fetch();

import '../imports/startup/accounts-config.js';
import App from './../imports/ui/App';
import { AuthChange } from "./../imports/ui/App";


Tracker.autorun(() => {
    const authenticated = !! Meteor.userId();
    AuthChange(authenticated);
});

Meteor.startup(() => {
        ReactDOM.render(<App />, document.getElementById('app'));
});