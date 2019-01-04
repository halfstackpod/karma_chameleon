import { Meteor } from 'meteor/meteor';
import {userKarma} from './../imports/api/userKarma';

Meteor.startup(() => {
// code to run on server at startup
    console.log("USER KARMA!");
    console.log(userKarma.find().fetch());
    console.log("Meteor users");
    console.log(Meteor.users.find().fetch());
});


// Meteor.publish("userKarma", function () {
//     return userKarma.find();
// });

// Meteor.publish('userData', function() {
//     if (this.userId) {
//         return Meteor.users.find({ _id: this.userId }, {
//             fields: { hasKarma: 1 }
//         });
//     } else {
//         this.ready();
//     }
// });