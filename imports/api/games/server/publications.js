import { Meteor } from 'meteor/meteor'
import Games from '../../games/games'

Meteor.publish('game', id => Games.find(id))
Meteor.publish('games', () => Games.find({}, { fields: { _id: 1, name: 1 } }))
