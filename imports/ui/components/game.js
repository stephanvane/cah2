import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import joinGame from '../actions/join_game'
import deleteGame from '../actions/delete_game'


const Game = ({ game, handleJoin, handleDelete }) => (
  <div className='mdl-list__item'>
    <div className='mdl-list__item-primary-content'>{game.name}</div>
    <button className='mdl-list__item-secondary-action mdl-button mdl-js-button mdl-button--colored mdl-button--raised' onClick={handleJoin}>join game</button>
    <Link to={`/games/${game._id}/table`} className='mdl-list__item-secondary-action mdl-button mdl-js-button'>table</Link>
    <button className='mdl-list__item-secondary-action mdl-button mdl-js-button' onClick={handleDelete}>delete</button>
  </div>
)

Game.propTypes = {
  game: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  handleJoin: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleJoin: () => { dispatch(joinGame(ownProps.game._id)) },
    handleDelete: () => { dispatch(deleteGame(ownProps.game._id)) }
  }
}

export default connect(null, mapDispatchToProps)(Game)
