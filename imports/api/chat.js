import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Message = new Mongo.Collection("message");

const chatSchema = new SimpleSchema({
    text: {
        type: String,
        min: 1,
    },
    author: String,
    timestamp: String
});

const newMessageValidationContext = chatSchema.namedContext('newMessageSubmission');

// if (Meteor.isServer) {
//     Meteor.publish('message', function () {
//         return Message.find( {} );
//     });
// }

// Meteor.methods({
//     'message.insert'(msg) {

//         if (newMessageValidationContext.validate(msg)) {
//             Message.insert({
//                 text: msg.text,
//                 timestamp: msg.timestamp,
//                 author: msg.author
//             });
//         }
//     }
// })