import { Meteor } from 'meteor/meteor'

export default function newGame() {
  return () => {
    Meteor.call('games.newGame', 'name')
  }
}
