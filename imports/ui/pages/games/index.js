import React, { PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import { connect } from 'react-redux'

import newGame from '../../actions/new_game'
import Games from '../../../api/games/games'
import Game from '../../components/game'

const GamesIndex = ({ games, handleNewGame }) => (
  <div>
    <div className='mdl-grid'>
      {/* <h1>Games</h1> */}
      <div className='mdl-cell mdl-cell--12-col mdl-card'>
        <div className='mdl-list'>
          {games.map(game => <Game game={game} key={game._id} />)}
        </div>
      </div>
    </div>
    <button className='mdl-button mdl-js-button' onClick={handleNewGame}>New game</button>
  </div>
)

GamesIndex.propTypes = {
  games: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired,
  handleNewGame: PropTypes.func.isRequired
}

const GamesIndexContainer = createContainer(() => {
  Meteor.subscribe('games')
  return { games: Games.find({}).fetch() }
}, GamesIndex)

function mapDispatchToProps(dispatch) {
  return {
    handleNewGame: () => {
      dispatch(newGame())
    }
  }
}

export default connect(null, mapDispatchToProps)(GamesIndexContainer)
