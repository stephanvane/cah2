import { Games } from '../api/collections'
import React, { PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import Spinner from './spinner'

const GamesTable = (props) => {
  if (!props.ready) {
    return <Spinner />
  }

  return (
    <div>
    <div className='section'>
      <h1>Table</h1>

    </div>
    <div className='divider'></div>
    <div className='section'>
      <div className='row'>
        <div className='col s4'>
          {props.game.players.map(player => player)}
        </div>
        <div className='col s8'>
          {props.game.table.cards.map(card => <Card card={card} key={card._id} />)}
        </div>
      </div>
    </div>
    </div>
  )
}

const Card = ({ card }) => {
  return (
    {card}
  )
}

export default createContainer((props) => {
  handle = Meteor.subscribe('game', props.params.id)
  game = Games.findOne(props.params.id)

  return {
    game: game,
    ready: handle.ready()
  }
}, GamesTable)
