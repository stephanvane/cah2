import React, { PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import { Games } from '../api/collections'
import Spinner from './spinner'

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
        <div className='row'>
          <div className='col s4'>
            {game.players.map(player => player)}
          </div>
          <div className='col s8'>
            {game.table.cards.map(card => <Card card={card} key={card._id} />)}
          </div>
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

const Card = ({ card }) => (
  <div>{card}</div>
)

export default createContainer((props) => {
  const handle = Meteor.subscribe('game', props.params.id)
  const game = Games.findOne(props.params.id)

  return {
    game,
    ready: handle.ready()
  }
}, GamesTable)
Card.propTypes = {
  card: PropTypes.any
}
