import { Games } from '../api/collections'
import React, { PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Link }  from 'react-router'

const GamesIndex = ({ games }) => {
  return (
    <div>
    <div className='section'>
      <h1>Games</h1>

    </div>
    <div className='divider'></div>
    <div className='section'>
      <div className='collection'>
        {games.map(game => <Game game={game} key={game._id} />)}
      </div>
    </div>
    </div>
  )
}

const Game = ({ game }) => {
  return (
    <div className='collection-item'>
      {game.name}
      <div className='secondary-content'>
        <Link to={`/games/${game._id}/client`} className='btn'>client</Link>
        <Link to={`/games/${game._id}/table`} className='btn'>table</Link>
      </div>
      <div className='clearfix'></div>
    </div>
  )
}

GamesIndex.propTypes = {
  games: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired
}

export default createContainer(() => {
  return {
    games: Games.find({}).fetch()
  }
}, GamesIndex)
