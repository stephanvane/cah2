import { Meteor } from 'meteor/meteor'

export default function chooseWinner(entry) {
  return (dispatch) => {
    dispatch({ type: 'winner', entry })
    Meteor.call('games.chooseWinner', entry)
  }
}
