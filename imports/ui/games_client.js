import React from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'

import { Games, Players, Cards } from '../api/collections'
import Spinner from './spinner'

const GamesClient = ({ ready, cards = [] }) => {
  if (!ready) {
    return <Spinner />
  }

  return (
    <div className='row'>
      {cards.map(card => <Card card={card} key={card._id} />)}
    </div>
  )
}

const Card = ({ card }) => (
  <div className='col s6 m4 l3'>
    <div className='card-panel white'>
      <div className='black-text'>{card.text}</div>
    </div>
  </div>
)

export default createContainer((props) => {
  const handle = Meteor.subscribe('game', props.params.id)
  const game = Games.findOne(props.params.id)
  const player = Players.findOne({ userId: Meteor.userId() })
  let cards
  if (player) {
    cards = player.cards.map(card => Cards.findOne(card))
  }

  return {
    game,
    ready: handle.ready(),
    player,
    cards
  }
}, GamesClient)
