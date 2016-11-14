import { Mongo } from 'meteor/mongo'

export const Cards = new Mongo.Collection('cards')
export const Players = new Mongo.Collection('players')
export const Games = new Mongo.Collection('games')

if (Meteor.isServer) {
  Meteor.publish('game', (id) => Games.find(id))
}

Meteor.methods({
  'games.newGame': (name) => {
    Games.insert({
      name: name,
      whiteDeck: newDeck('white'),
      blackDeck: newDeck('black'),
      table: { cards: [] },
      players: []
    })
  },
  'games.newRound': (game_id) => {
    const game = Games.findOne(game_id)
    const players = Players.find({ _id: { $in: game.players } })

    players.forEach(function(player) {
      const num = 10 - player.cards.length
      const cards = game.whiteDeck.slice(0, num)

      Players.update(player, { $addToSet: { cards: { $each: cards } } })
      Games.update(game, { $pull: { whiteDeck: { $in: cards } } })
    })
  }
})

function newDeck(type) {
  cards = Cards.find({type: type}).fetch()
  cards = _.pluck(cards, '_id')
  return _.shuffle(cards)
}

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
