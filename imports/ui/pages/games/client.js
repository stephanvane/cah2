import React, { PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { connect } from 'react-redux'

import Players from '../../../api/players/players'
import Games from '../../../api/games/games'
import playCard from '../../actions/play_card'
import Spinner from '../../components/spinner'
import Card from '../../components/card'
import Czar from '../../components/czar'

function GamesClient({ player, game, cards, handlePlayCard, ready }) {
  if (!ready) {
    return <Spinner />
  }

  if (game.czar === player._id) {
    return <Czar game={game} />
  }

  return (
    <div className='mdl-grid'>
      {cards.map(card => <Card
        card={card} key={card._id}
        onClick={() => handlePlayCard(game._id, card._id)}
      />)}
    </div>
  )
}

GamesClient.propTypes = {
  game: PropTypes.shape(),
  cards: PropTypes.arrayOf(PropTypes.object),
  ready: PropTypes.bool.isRequired,
  handlePlayCard: PropTypes.func.isRequired,
  player: PropTypes.shape()
}

const GamesClientContainer = createContainer((props) => {
  const gameHandle = Meteor.subscribe('game', props.params.id)
  const playerHandle = Meteor.subscribe('player', props.params.id)

  const game = Games.findOne(props.params.id)
  const player = Players.findOne({ userId: Meteor.userId() })
  const cards = (player) ? player.cards : []

  return {
    game,
    ready: gameHandle.ready() && playerHandle.ready(),
    player,
    cards
  }
}, GamesClient)

const mapDispatchToProps = {
  handlePlayCard: playCard
}

export default connect(null, mapDispatchToProps)(GamesClientContainer)
