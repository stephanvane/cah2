import { Meteor } from 'meteor/meteor'

export default function joinGame(id) {
  return () => {
    Meteor.call('games.delete', id)
  }
}
