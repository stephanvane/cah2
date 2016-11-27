import React, { PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import { connect } from 'react-redux'

import Games from '../../../api/games/games'
import newRound from '../../actions/new_round'
import reveal from '../../actions/reveal'

import Spinner from '../../components/spinner'
import Card from '../../components/card'

const GamesTable = ({ ready, game, handleNewRound, handleReveal }) => {
  if (!ready) {
    return <Spinner />
  }

  return (
    <div className='mdl-grid'>
      <div className='mdl-cell mdl-cell--12-col'>
        <h1>Table</h1>
      </div>
      <div className='mdl-cell mdl-cell--12-col'>
        {game.players.map(player => player)}
      </div>
      {game.table.blackCard && <Card card={game.table.blackCard} />}
      <div className='clearfix' />
      {game.table.whiteCards.map(card =>
        <Card card={card} key={card._id} hidden={game.table.hidden} />)}

      <div className='mdl-cell mdl-cell--12-col'>
        <button className='mdl-button mdl-js-button' onClick={() => handleNewRound(game._id)}>New round</button>
        <button className='mdl-button mdl-js-button' onClick={() => handleReveal(game._id)}>Reveal cards</button>
      </div>
    </div>
  )
}
GamesTable.propTypes = {
  ready: PropTypes.bool.isRequired,
  game: PropTypes.shape({
    players: PropTypes.arrayOf(PropTypes.string).isRequired,
    table: PropTypes.shape({
      whiteCards: PropTypes.arrayOf(PropTypes.any),
      blackCard: PropTypes.any,
      hidden: PropTypes.bool
    })
  }),
  handleReveal: PropTypes.func,
  handleNewRound: PropTypes.func
}

const GameTableContainer = createContainer((props) => {
  const handle = Meteor.subscribe('game', props.params.id)
  const game = Games.findOne(props.params.id)

  return {
    game,
    ready: handle.ready()
  }
}, GamesTable)

function mapDispatchToProps(dispatch) {
  return {
    handleNewRound(id) { dispatch(newRound(id)) },
    handleReveal(id) { dispatch(reveal(id)) }
  }
}

export default connect(null, mapDispatchToProps)(GameTableContainer)
