import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Card from './card'
import chooseWinner from '../actions/choose_winner'
import reveal from '../actions/reveal'

// Czar
const Czar = ({ game, handleChooseWinner, handleReveal }) => (
  <div>
    {/* <h1>Card Czar</h1>
    Choose the winning card! */}
    <div className='mdl-grid'>
      {game.table.whiteCards.map((card, index) => <Card
        card={card} hidden={game.table.hidden} key={card._id}
        click={() => handleChooseWinner(game._id, index)}
      />)}

      <div className='mdl-cell mdl-cell--12-col'>
        <button className='mdl-button mdl-js-button' onClick={() => handleReveal(game._id)}>Reveal cards</button>
      </div>
    </div>
  </div>
)

Czar.propTypes = {
  game: PropTypes.shape().isRequired,
  handleChooseWinner: PropTypes.func.isRequired,
  handleReveal: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  handleChooseWinner: chooseWinner,
  handleReveal: reveal
}

export default connect(null, mapDispatchToProps)(Czar)
