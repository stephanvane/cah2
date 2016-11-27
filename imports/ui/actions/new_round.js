import { Meteor } from 'meteor/meteor'

export default function newGame(id) {
  return () => {
    Meteor.call('games.newRound', id)
  }
}
