import { Meteor } from 'meteor/meteor'

export default function chooseWinner(gameId, cardIndex) {
  return (dispatch) => {
    dispatch({ type: 'winner', gameId, cardIndex })
    Meteor.call('games.chooseWinner', gameId, cardIndex)
  }
}
