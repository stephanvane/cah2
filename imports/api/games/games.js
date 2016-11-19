import { Mongo } from 'meteor/mongo'

export default new Mongo.Collection('games')

// gameSchema = new SimpleSchema({
//   name: {
//     type: String,
//     max: 50
//   },
//   whiteDeck: {
//     type: [Object],
//     blackbox: true
//   },
//   blackDeck: {
//     type: [Object],
//     blackbox: true
//   },
//   table: {
//     type: Object
//   },
//   'table.cards': {
//     type: [cardSchema]
//   },
//   players: {
//     type: [String],
//     regEx: SimpleSchema.RegEx.Id
//   }
// });
