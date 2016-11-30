import { Meteor } from 'meteor/meteor'

export default function newGame(gameId, cardId) {
  return () => {
    Meteor.call('games.playCard', gameId, cardId)
  }
}
