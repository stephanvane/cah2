import { Meteor } from 'meteor/meteor'
import Games from '../games'
import Players from '../../players/players'

// Publishes Game and current player
// NOTE: can't user arrow function because `this.userId` wouldn't work
Meteor.publish('game', function publish(id) {
  return [
    Games.find(id),
    Players.find({ gameId: id }, { fields: { _id: 1, points: 1 } })
  ]
})

Meteor.publish('games', () => Games.find({}, { fields: { _id: 1, name: 1 } }))
