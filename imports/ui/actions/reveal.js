import { Meteor } from 'meteor/meteor'

export default function reveal(id) {
  return () => {
    Meteor.call('games.reveal', id)
  }
}
