import React, { PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import { Games } from '../api/collections'
import Spinner from './spinner'
import Card from './card'

const GamesTable = ({ ready, game }) => {
  function handleNewRound() {
    Meteor.call('games.newRound', game._id)
  }

  if (!ready) {
    return <Spinner />
  }

  return (
    <div>
      <div className='section'>
        <h1>Table</h1>
      </div>
      <div className='divider' />
      <div className='section'>
        {game.players.map(player => player)}
      </div>
      <div className='divider' />
      <div className='section'>
        <div className='row'>
          {game.table.cards.map(card => <Card card={card} key={card._id} />)}
        </div>
      </div>
      <div className='divider' />
      <div className='section'>
        <button className='btn' onClick={handleNewRound}>New round</button>
      </div>
    </div>
  )
}
GamesTable.propTypes = {
  ready: PropTypes.bool.isRequired,
  game: PropTypes.shape({
    players: PropTypes.arrayOf(PropTypes.string).isRequired,
    table: PropTypes.shape({
      cards: PropTypes.arrayOf(PropTypes.any)
    })
  })
}

export default createContainer((props) => {
  const handle = Meteor.subscribe('game', props.params.id)
  const game = Games.findOne(props.params.id)

  return {
    game,
    ready: handle.ready()
  }
}, GamesTable)
