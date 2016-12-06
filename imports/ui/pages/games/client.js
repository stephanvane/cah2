import React, { PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { connect } from 'react-redux'

import Players from '../../../api/players/players'
import Games from '../../../api/games/games'
import playCard from '../../actions/play_card'
import wonRound from '../../actions/won_round'
import Spinner from '../../components/spinner'
import Card from '../../components/card'
import Czar from '../../components/czar'
import Score from '../../components/score'

function GamesClient({ players, player, game, handlePlayCard, ready }) {
  if (!ready) {
    return <Spinner />
  }

  // Render Czar or player's own hand
  let content = null

  if (game.czar === player._id) {
    content = <Czar game={game} />
  } else {
    content = (
      <div className='mdl-grid'>
        {player.cards.map(card => <Card
          card={card} key={card._id}
          onClick={() => handlePlayCard(game._id, card._id)}
        />)}
      </div>
    )
  }

  return (
    <div className='mdl-grid mdl-grid--no-spacing'>
      <div className='mdl-cell mdl-cell--4-col'>
        <div className='mdl-grid'>
          <div className='mdl-cell mdl-cell--12-col mdl-card mdl-shadow--2dp'>
            <Score players={players} currentPlayerId={player._id} czarId={game.czar} />
          </div>
        </div>
      </div>
      <div className='mdl-cell mdl-cell--8-col'>
        {content}
      </div>
    </div>
  )
}

GamesClient.propTypes = {
  game: PropTypes.shape(),
  ready: PropTypes.bool.isRequired,
  handlePlayCard: PropTypes.func.isRequired,
  player: PropTypes.shape(),
  players: PropTypes.arrayOf(PropTypes.shape)
}

const GamesClientContainer = createContainer((props) => {
  const gameHandle = Meteor.subscribe('game', props.params.id)
  const playerHandle = Meteor.subscribe('player', props.params.id)

  const game = Games.findOne(props.params.id)
  const players = Players.find({}).fetch()
  let player = Players.find({ userId: Meteor.userId() })

  player.observeChanges({
    changed: (id) => {
      props.handleWonRound(id)
    }
  })

  player = player.fetch()[0]

  return {
    players,
    game,
    ready: gameHandle.ready() && playerHandle.ready(),
    player
  }
}, GamesClient)

const mapDispatchToProps = {
  handlePlayCard: playCard,
  handleWonRound: wonRound
}

export default connect(null, mapDispatchToProps)(GamesClientContainer)
