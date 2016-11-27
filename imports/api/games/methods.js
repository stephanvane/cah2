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
    Games.insert({
      name,
      whiteDeck: newDeck('white'),
      blackDeck: newDeck('black'),
      table: { whiteCards: [], hidden: true },
      players: []
    })
  },

  'games.newRound': (gameId) => {
    const game = Games.findOne(gameId)
    const players = Players.find({ _id: { $in: game.players } })

    players.forEach((player) => {
      const num = 10 - player.cards.length
      const cardIds = game.whiteDeck.slice(0, num)
      const cards = Cards.find({ _id: { $in: cardIds } }).fetch()

      Players.update(player, { $addToSet: { cards: { $each: cards } } })

      if (Meteor.isServer) {
        Games.update(game, { $pull: { whiteDeck: { $in: cardIds } } })
      }
    })

    const blackCard = Cards.findOne(game.blackDeck[0])
    Games.update(game._id, {
      $set: { 'table.blackCard': blackCard, 'table.whiteCards': [], 'table.hidden': true },
      $pop: { blackDeck: -1 } })
  },

  'games.playCard': (gameId, cardId) => {
    const game = Games.findOne(gameId)
    const card = Cards.findOne(cardId)
    const player = Players.findOne({ userId: Meteor.userId(), gameId })
    // if (Meteor.isServer) card.hidden = true // TODO: make work on client
    Games.update(game._id, { $addToSet: { 'table.whiteCards': card } })
    Players.update(player._id, { $pull: { cards: { _id: cardId } } })
  },

  'games.delete': (gameId) => {
    Games.remove(gameId)
    Players.remove({ gameId })
  },

  'games.reveal': (gameId) => {
    Games.update(gameId, { $set: { 'table.hidden': false } })
  },

  'games.join': (gameId) => {
    const playerData = { gameId, userId: Meteor.userId(), points: 0 }
    let player = Players.findOne(playerData)
    player = (player) ? player._id : Players.insert({ ...playerData, cards: [] })
    Games.update(gameId, { $addToSet: { players: player } })
  }
})
