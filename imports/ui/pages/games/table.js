import React, { PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import { connect } from 'react-redux'

import Games from '../../../api/games/games'
import Players from '../../../api/players/players'
import newRound from '../../actions/new_round'
import reveal from '../../actions/reveal'

import Spinner from '../../components/spinner'
import Card from '../../components/card'
import PlayerChip from '../../components/player_chip'

const GamesTable = ({ ready, game, players, handleNewRound, handleReveal }) => {
  if (!ready) {
    return <Spinner />
  }

  return (
    <div className='mdl-grid'>
      <div className='mdl-cell mdl-cell--12-col'>
        {/* <h1>Table</h1> */}
      </div>
      <div className='mdl-cell mdl-cell--12-col'>
        {players.map(player =>
          <PlayerChip key={player._id} player={player} colored={game.czar === player._id} />
        )}
      </div>
      {game.blackCard && <Card card={game.blackCard} />}
      <div className='clearfix' />
      {game.entries.map(entry =>
        <Card card={entry.card} key={entry.card._id} hidden={game.cardsHidden} />)}

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
    table: PropTypes.shape({
      whiteCards: PropTypes.arrayOf(PropTypes.any),
      blackCard: PropTypes.any,
      hidden: PropTypes.bool
    })
  }),
  players: PropTypes.arrayOf(PropTypes.object),
  handleReveal: PropTypes.func,
  handleNewRound: PropTypes.func,
}

const GameTableContainer = createContainer((props) => {
  const gameHandle = Meteor.subscribe('game', props.params.id)

  const game = Games.findOne(props.params.id)
  const players = Players.find({}).fetch()
  const currentPlayer = Players.findOne({ userId: Meteor.userId() })

  return {
    game,
    players,
    currentPlayer,
    ready: gameHandle.ready()
  }
}, GamesTable)

function mapDispatchToProps(dispatch) {
  return {
    handleNewRound(id) { dispatch(newRound(id)) },
    handleReveal(id) { dispatch(reveal(id)) }
  }
}

export default connect(null, mapDispatchToProps)(GameTableContainer)
