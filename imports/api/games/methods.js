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
      table: { whiteCards: [] },
      players: []
    })
  },

  'games.newRound': (gameId) => {
    const game = Games.findOne(gameId)
    const players = Players.find({ _id: { $in: game.players } })

    players.forEach((player) => {
      const num = 10 - player.cards.length
      const cards = Cards.find({ _id: { $in: game.whiteDeck.slice(0, num) } }).fetch()

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
    const player = Players.findOne({ userId: Meteor.userId(), gameId })
    if (Meteor.isServer) card.hidden = true // TODO: make work on client
    Games.update(game._id, { $addToSet: { 'table.whiteCards': card } })
    Players.update(player._id, { $pull: { cards: card } })
  },

  'games.remove': (gameId) => {
    Games.remove(gameId)
    Players.remove({ gameId })
  },

  'games.join': (gameId) => {
    const playerData = { gameId, userId: Meteor.userId() }
    let player = Players.findOne(playerData)
    player = (player) ? player._id : Players.insert({ ...playerData, cards: [] })
    Games.update(gameId, { $addToSet: { players: player } })
  }
})
