import { Mongo } from 'meteor/mongo'

export default new Mongo.Collection('players')

// playerSchema = new SimpleSchema({
//   name: {
//     type: String,
//     max: 50
//   },
//   cards: {
//     type: [cardSchema]
//   },
//   userId: {
//     type: 'String',
//     regEx: SimpleSchema.RegEx.Id
//   },
//   gameId: {
//     type: 'String',
//     regEx: SimpleSchema.RegEx.Id,
//     optional: true
//   }
// });
