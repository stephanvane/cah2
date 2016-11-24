import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'

import Games from '../../../api/games/games'
import Players from '../../../api/players/players'

import Spinner from '../../components/spinner'
import Card from '../../components/card'

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
      <div className='mdl-grid'>
        {this.props.cards.map(card => <Card
          card={card} key={card._id}
          click={this.handlePlayCard}
        />)}
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
  const player = Players.findOne({})
  const cards = (player) ? player.cards : []

  return {
    game,
    ready: handle.ready(),
    player,
    cards
  }
}, GamesClient)
