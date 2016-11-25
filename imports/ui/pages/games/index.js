import React, { Component, PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'
import { Link, browserHistory } from 'react-router'
import { createContainer } from 'meteor/react-meteor-data'

import Games from '../../../api/games/games'

const GamesIndex = ({ games }) => {
  function handleNewGame() {
    Meteor.call('games.newGame', 'name1')
  }

  return (
    <div>
      <div className='mdl-grid'>
        <h1>Games</h1>
        <div className='mdl-cell mdl-cell--12-col mdl-card'>
          <div className='mdl-list'>
            {games.map(game => <Game game={game} key={game._id} />)}
          </div>
        </div>
      </div>
      <button className='mdl-button mdl-js-button' onClick={handleNewGame}>New game</button>
    </div>
  )
}
GamesIndex.propTypes = {
  games: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired
}


class Game extends Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleJoin = this.handleJoin.bind(this)
  }

  handleDelete() {
    Meteor.call('games.remove', this.props.game._id)
  }

  handleJoin() {
    Meteor.call('games.join', this.props.game._id)
    browserHistory.push(`/games/${this.props.game._id}/client`)
  }

  render() {
    return (
      <div className='mdl-list__item'>
        <div className='mdl-list__item-primary-content'>{this.props.game.name}</div>
        <button className='mdl-list__item-secondary-action mdl-button mdl-js-button mdl-button--colored mdl-button--raised' onClick={this.handleJoin}>join game</button>
        <Link to={`/games/${this.props.game._id}/table`} className='mdl-list__item-secondary-action mdl-button mdl-js-button'>table</Link>
        <button className='mdl-list__item-secondary-action mdl-button mdl-js-button' onClick={this.handleDelete}>delete</button>
      </div>
    )
  }
}

Game.propTypes = {
  game: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired
}

export default createContainer(() => {
  Meteor.subscribe('games')
  return { games: Games.find({}).fetch() }
}, GamesIndex)
