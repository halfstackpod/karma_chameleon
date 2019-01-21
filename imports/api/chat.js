import {Mongo} from 'meteor/mongo';

export const Message = new Mongo.Collection("message");

if (Meteor.isServer) {
    Meteor.publish('message', function () {
        return Message.find( {} );
    });
}

Meteor.methods({
    'message.insert'(msg) {
        Message.insert({
            text: msg.text,
            timestamp: msg.timestamp,
            author: msg.author
        });
    }
})