import React, { PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { connect } from 'react-redux'

import Players from '../../../api/players/players'
import playCard from '../../actions/play_card'
import Spinner from '../../components/spinner'
import Card from '../../components/card'

function GamesClient({ gameId, cards, handlePlayCard, ready }) {
  if (!ready) {
    return <Spinner />
  }

  return (
    <div className='mdl-grid'>
      {cards.map(card => <Card
        card={card} key={card._id}
        click={() => handlePlayCard(gameId, card._id)}
      />)}
    </div>
  )
}

GamesClient.propTypes = {
  gameId: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.object
  ),
  ready: PropTypes.bool.isRequired,
  handlePlayCard: PropTypes.func.isRequired
}

const GamesClientContainer = createContainer((props) => {
  const handle = Meteor.subscribe('game', props.params.id)

  const gameId = props.params.id
  const player = Players.findOne({})
  const cards = (player) ? player.cards : []

  return {
    gameId,
    ready: handle.ready(),
    player,
    cards
  }
}, GamesClient)

function mapDispatchToProps(dispatch) {
  return {
    handlePlayCard: (gameId, cardId) => dispatch(playCard(gameId, cardId))
  }
}

export default connect(null, mapDispatchToProps)(GamesClientContainer)
