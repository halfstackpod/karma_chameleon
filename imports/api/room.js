import {Mongo} from 'meteor/mongo';

import {userKarma} from './userKarma'

export const Room = new Mongo.Collection("room");

// const roomSchema = new SimpleSchema({
//     owner: String,
//     private: Boolean,
//     name: String,
//     members: Array
// });

// TOOD: validation like in chat?

if (Meteor.isServer) {
    Meteor.publish('room', function () {
        return Room.find( {} );
    });
}

Meteor.methods({
    'room.create'(data) {
        Room.insert({
            owner: data.owner,
            private: data.private,
            name: data.name,
            members: data.members
        })
    },
    'room.join'(data) {
        Room.update({name: data.roomName}, {
            $addToSet: {members: data.userId}
        })
        userKarma.update({_id: Meteor.userId()}, {
            $addToSet: {rooms: data.roomName}
        })
    }
})