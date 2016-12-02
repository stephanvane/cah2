import { Meteor } from 'meteor/meteor'

export default function playCard(gameId, cardId) {
  return (dispatch) => {
    Meteor.call('games.playCard', gameId, cardId)
    dispatch({ type: 'PLAY_CARD', gameId, cardId })
  }
}
