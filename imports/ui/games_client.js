import { Games, Players, Cards } from '../api/collections'
import React, { PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import Spinner from './spinner'

const GamesClient = (props) => {
  if (!props.ready) {
    return <Spinner />
  }

  return (
    <div className='row'>
      {props.cards.map(card => <Card card={card} key={card._id} />)}
    </div>
  )
}

const Card = ({ card }) => {
  return (
    <div className='col s6 m4 l3'>
      <div className='card-panel white'>
        <div className='black-text'>{card.text}</div>
      </div>
    </div>
  )
}

export default createContainer((props) => {
  const handle = Meteor.subscribe('game', props.params.id)
  const game = Games.findOne(props.params.id)
  const player = Players.findOne({ userId: Meteor.userId() })
  let cards
  if (player) {
    cards = player.cards.map(card => Cards.findOne(card))
  }

  return {
    game: game,
    ready: handle.ready(),
    player: player,
    cards: cards
  }
}, GamesClient)
