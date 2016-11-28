import { Meteor } from 'meteor/meteor'

export default function newGame(gameId, cardId) {
  return (dispatch) => {
    Meteor.call('games.playCard', gameId, cardId)
    dispatch({ type: 'foo' })
  }
}
