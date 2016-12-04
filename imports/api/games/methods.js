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
      blackCard: null,
      entries: [],
      cardsHidden: true,
      players: [],
      czar: null
    })
  },

  'games.newRound': (gameId) => {
    const game = Games.findOne(gameId)
    const players = Players.find({ _id: { $in: game.players } })

    if (Meteor.isServer) {
      players.forEach((player) => {
        const num = 10 - player.cards.length
        const cardIds = game.whiteDeck.splice(0, num)
        const cards = Cards.find({ _id: { $in: cardIds } }).fetch()

        Players.update(player, { $addToSet: { cards: { $each: cards } } })
        Games.update(game, { $pull: { whiteDeck: { $in: cardIds } } })
      })
    }

    const blackCard = Cards.findOne(game.blackDeck[0])
    const currentCzarIndex = game.players.indexOf(game.czar)
    const czar = currentCzarIndex > -1 ?
      game.players[(currentCzarIndex + 1) % game.players.length] :
      game.players[0]
    Games.update(game._id, {
      $set: { blackCard, entries: [], cardsHidden: true, czar },
      $pop: { blackDeck: -1 } })
  },

  'games.playCard': (gameId, cardId) => {
    const game = Games.findOne(gameId)
    const card = Cards.findOne(cardId)
    const player = Players.findOne({ userId: Meteor.userId(), gameId })
    Games.update(game._id, { $addToSet: { entries: { cards: [card], playedBy: player._id } } })
    Players.update(player._id, { $pull: { cards: { _id: cardId } } })
  },

  'games.delete': (gameId) => {
    Games.remove(gameId)
    Players.remove({ gameId })
  },

  'games.reveal': (gameId) => {
    const game = Games.findOne(gameId, { fields: { entries: 1 } })
    const entries = _.shuffle(game.entries)
    Games.update(gameId, { $set: { cardsHidden: false, entries } })
  },

  // Need to use 'function' to make sure 'this.userId' works
  'games.join': function join(gameId) {
    const playerData = { gameId, userId: this.userId }
    let player = Players.findOne(playerData)
    player = (player) ? player._id : Players.insert({ ...playerData, cards: [], points: 0 })
    Games.update(gameId, { $addToSet: { players: player } })
  },

  'games.chooseWinner': (entry) => {
    Players.update(entry.playedBy, { $inc: { points: 1 } })
  }
})
