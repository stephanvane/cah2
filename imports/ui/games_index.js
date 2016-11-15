import React, { PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'
import { Link } from 'react-router'
import { createContainer } from 'meteor/react-meteor-data'

import { Games } from '../api/collections'

const GamesIndex = ({ games }) => {
  function handleNewGame() {
    Meteor.call('games.newGame', 'name1')
  }

  return (
    <div>
      <div className='section'>
        <h1>Games</h1>
      </div>
      <div className='divider' />
      <div className='section'>
        <div className='collection'>
          {games.map(game => <Game game={game} key={game._id} />)}
        </div>
        <div className='divider' />
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


const Game = ({ game }) => (
  <div className='collection-item'>
    {game.name}
    <div className='secondary-content'>
      <Link to={`/games/${game._id}/client`} className='btn'>client</Link>
      <Link to={`/games/${game._id}/table`} className='btn'>table</Link>
    </div>
    <div className='clearfix' />
  </div>
)
Game.propTypes = {
  game: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired
}

export default createContainer(() => ({
  games: Games.find({}).fetch()
}), GamesIndex)
