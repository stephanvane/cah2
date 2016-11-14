import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import { _ } from 'meteor/underscore'

export const Cards = new Mongo.Collection('cards')
export const Players = new Mongo.Collection('players')
export const Games = new Mongo.Collection('games')

if (Meteor.isServer) {
  Meteor.publish('game', id => Games.find(id))
}

function newDeck(type) {
  let cards = Cards.find({ type }).fetch()
  cards = _.pluck(cards, '_id')
  return _.shuffle(cards)
}

Meteor.methods({
  'games.newGame': (name) => {
    Games.insert({
      name,
      whiteDeck: newDeck('white'),
      blackDeck: newDeck('black'),
      table: { cards: [] },
      players: [Players.find({}).fetch()[0]._id]
    })
  },
  'games.newRound': (gameId) => {
    const game = Games.findOne(gameId)
    const players = Players.find({ _id: { $in: game.players } })


    players.forEach((player) => {
      const num = 10 - player.cards.length
      const cards = game.whiteDeck.slice(0, num)

      Players.update(player, { $addToSet: { cards: { $each: cards } } })
      Games.update(game, { $pull: { whiteDeck: { $in: cards } } })
    })
  }
})

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
//
//
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
//
//
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
