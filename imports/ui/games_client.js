import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'

import { Games, Players, Cards } from '../api/collections'
import Spinner from './spinner'
import Card from './card'

class GamesClient extends Component {
  constructor(props) {
    super(props)
    this.handlePlayCard = this.handlePlayCard.bind(this)
  }

  handlePlayCard(cardId) {
    Meteor.call('games.playCard', this.props.game._id, cardId)
  }

  render() {
    if (!this.props.ready) {
      return <Spinner />
    }

    return (
      <div>
        <div className='row'>
          {this.props.cards.map(card => <Card
            card={card} key={card._id}
            click={this.handlePlayCard}
          />)}
        </div>
      </div>
    )
  }
}
GamesClient.propTypes = {
  game: PropTypes.shape({
    _id: PropTypes.string.isRequired
  }),
  cards: PropTypes.arrayOf(
    PropTypes.object
  ),
  ready: PropTypes.bool.isRequired
}

export default createContainer((props) => {
  const handle = Meteor.subscribe('game', props.params.id)
  const game = Games.findOne(props.params.id)
  const player = Players.findOne({ userId: Meteor.userId() })
  let cards
  if (player) {
    // cards = player.cards.map(card => Cards.findOne(card))
    cards = Cards.find({ _id: { $in: player.cards } }).fetch()
  }

  return {
    game,
    ready: handle.ready(),
    player,
    cards
  }
}, GamesClient)
