import React, { Component, PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'
import { Link } from 'react-router'
import { createContainer } from 'meteor/react-meteor-data'

import Games from '../api/games/games'

const GamesIndex = ({ games }) => {
  function handleNewGame() {
    Meteor.call('games.newGame', 'name1')
  }

  return (
    <div>
      <div className='section'>
        <h1>Games</h1>
      </div>
      <div className='section'>
        <div className='collection'>
          {games.map(game => <Game game={game} key={game._id} />)}
        </div>
        <div className='section'>
          <button className='btn' onClick={handleNewGame}>New game</button>
        </div>
      </div>
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
  }

  handleDelete() {
    Meteor.call('games.remove', this.props.game._id)
  }

  render() {
    return (
      <div className='collection-item'>
        {this.props.game.name}
        <div className='secondary-content'>
          <Link to={`/games/${this.props.game._id}/client`} className='btn'>client</Link>
          <Link to={`/games/${this.props.game._id}/table`} className='btn'>table</Link>
          <button className='btn red' onClick={this.handleDelete}>delete</button>
        </div>
        <div className='clearfix' />
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
