import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Room } from './room'

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
    rooms: {
        type: Array,
        optional: true
    },
    'rooms.$': {
        type: String, 
        optional: true
    },
    owner: String
});

const newUserValidationContext = userSchema.namedContext('newUserForm');

if (Meteor.isServer) {
    Meteor.publish('userKarmaPublish', function(roomId) {
        const room = Room.findOne({_id: roomId}, {fields: {members: 1}})
        const members = room.members;
        return userKarma.find( {owner: {$in: members}} );
    });
}

Meteor.methods({
    'userKarma.insert' (newUser) {
        if (newUserValidationContext.validate(newUser)) {
            userKarma.insert({
                name: newUser.name,
                alias: newUser.alias || newUser.name,
                karma: newUser.karma,
                rooms: [],
                owner: newUser.owner
            });
        }
    },

    'userKarma.update' (karmaUpdate) {
        userKarma.update( karmaUpdate._id, { $inc: { karma: karmaUpdate.inc }})
    },

    'userKarma.remove' (user) {
        userKarma.remove(user._id)
    }
});