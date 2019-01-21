import React from 'react';
import ReactDOM from 'react-dom';

import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';

import '../imports/startup/accounts-config.js';
import App from './../imports/ui/App';
import { AuthChange } from "./../imports/routes/Routes";

Tracker.autorun(() => {
    const authenticated = !! Meteor.userId();
    AuthChange(authenticated);
});

Meteor.startup(() => {
        ReactDOM.render(<App />, document.getElementById('app'));
});