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
    Meteor.publish('room', function(userId) {
        const user = userKarma.findOne({owner: userId}, {fields: {rooms: 1}})
        return Room.find( {name: {$in: user.rooms}} )
    });
}

Meteor.methods({
    'room.create'(data) {
        Room.insert({
            owner: data.owner,
            private: data.private,
            name: data.name,
            members: data.members,
            messages: []
        })
    },
    'room.join'(data) {
        Room.update({name: data.roomName}, {
            $addToSet: {members: data.userId}
        })
        userKarma.update({owner: Meteor.userId()}, {
            $addToSet: {rooms: data.roomName}
        })
    },
    'room.message.create'(data) {
        Room.update({_id: data.roomId}, {
            $addToSet: {
                messages: {
                    text: data.msg.text,
                    timestamp: data.msg.timestamp,
                    author: data.msg.author,
                    epoch: data.msg.epoch
                }
            }
        })
    }
})