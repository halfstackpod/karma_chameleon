import React from 'react';
import ReactDOM from 'react-dom';

import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';

import {userKarma} from './../imports/api/userKarma';

import '../imports/startup/accounts-config.js';
import App from './../imports/ui/App';

Meteor.startup(() => {
    Tracker.autorun(() => {
        let userKarmaList = userKarma.find({}).fetch();
        ReactDOM.render(<App karma={userKarmaList}/>, document.getElementById('app'));
    });
});