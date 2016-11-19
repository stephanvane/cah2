import { Meteor } from 'meteor/meteor'
import { _ } from 'meteor/underscore'

import Games from './games'
import Cards from '../cards/cards'
import Players from '../players/players'

function newDeck(type) {
  let cards = Cards.find({ type }).fetch()
  cards = _.pluck(cards, '_id')
  return _.shuffle(cards)
}

Meteor.methods({
  'games.newGame': (name) => {
    console.log('test123')
    Games.insert({
      name,
      whiteDeck: newDeck('white'),
      blackDeck: newDeck('black'),
      table: { whiteCards: [] },
      players: (Meteor.userId()) ? [Meteor.userId()] : []
    })
  },

  'games.newRound': (gameId) => {
    const game = Games.findOne(gameId)
    const players = Players.find({ _id: { $in: game.players } })

    players.forEach((player) => {
      const num = 10 - player.cards.length
      const cards = game.whiteDeck.slice(0, num)

      Players.update(player, { $addToSet: { cards: { $each: cards } } })

      if (Meteor.isServer) {
        Games.update(game, { $pull: { whiteDeck: { $in: cards } } })
      }
    })

    const blackCard = Cards.findOne(game.blackDeck[0])
    Games.update(game._id, {
      $set: { 'table.blackCard': blackCard, 'table.whiteCards': [] },
      $pop: { blackDeck: -1 } })
  },

  'games.playCard': (gameId, cardId) => {
    const game = Games.findOne(gameId)
    const card = Cards.findOne(cardId)
    const player = Players.findOne({ userId: Meteor.userId() })

    Games.update(game._id, { $addToSet: { 'table.whiteCards': card } })
    Players.update(player._id, { $pull: { cards: cardId } })
  },

  'games.remove': (gameId) => {
    Games.remove(gameId)
  }
})
