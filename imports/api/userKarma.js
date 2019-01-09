import {Mongo} from 'meteor/mongo';

export const userKarma = new Mongo.Collection("userKarma");

if (Meteor.isServer) {
    Meteor.publish('userKarmaPublish', function () {
        return userKarma.find( {} );
    });
}

Meteor.methods({
    'userKarma.insert' (ele) {
        userKarma.insert({
            name: ele.userName,
            alias: ele.alias || ele.userName,
            karma: ele.karma,
            owner: ele.owner
        });
    },

    'userKarma.update' (karmaUpdate) {
        userKarma.update( karmaUpdate._id, { $inc: { karma: karmaUpdate.inc }})
    }
})