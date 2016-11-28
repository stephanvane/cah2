import { Meteor } from 'meteor/meteor'
import Players from '../players'

Meteor.publish('player', function publish(gameId) {
  return [
    Players.find({ gameId, userId: this.userId })
  ]
})
