import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const userKarma = new Mongo.Collection("userKarma");

const userSchema = new SimpleSchema({
    name: {
        type: String,
        min: 3,
        max: 255
    },
    alias: {
        type: String,
        optional: true,
        min: 3,
        max: 255
    },
    karma: SimpleSchema.Integer,
    owner: String
});

const newUserValidationContext = userSchema.namedContext('newUserForm');

if (Meteor.isServer) {
    Meteor.publish('userKarmaPublish', function () {
        return userKarma.find( {} );
    });
}

Meteor.methods({
    'userKarma.insert' (newUser) {

        if (newUserValidationContext.validate(newUser)) {
            userKarma.insert({
                name: newUser.name,
                alias: newUser.alias || newUser.name,
                karma: newUser.karma,
                owner: newUser.owner
            });
        }
    },

    'userKarma.update' (karmaUpdate) {
        userKarma.update( karmaUpdate._id, { $inc: { karma: karmaUpdate.inc }})
    }
});