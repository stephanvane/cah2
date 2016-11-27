import { Meteor } from 'meteor/meteor'
import { browserHistory } from 'react-router'

export default function joinGame(id) {
  return () => {
    Meteor.call('games.join', id)
    browserHistory.push(`/games/${id}/client`)
  }
}
