import { Mongo } from 'meteor/mongo'

export default new Mongo.Collection('cards')

// cardSchema = new SimpleSchema({
//   type: {
//     type: String,
//     allowedValues: ['white', 'black']
//   },
//   text: {
//     type: String
//   },
//   set: {
//     type: String,
//     allowedValues: ['basic'],
//     defaultValue: 'basic'
//   }
// });
