import React, { PropTypes } from 'react'
import Card from './card'

const Table = ({ game, click }) => (
  <div className='mdl-grid'>
    {game.blackCard && <Card card={game.blackCard} />}
    {game.entries.map(entry =>
      <Card
        card={entry.cards[0]} key={entry.cards[0]._id}
        hidden={game.cardsHidden} onClick={() => click(entry)}
      />)}
  </div>
)

Table.propTypes = {
  game: PropTypes.shape().isRequired,
  click: PropTypes.func
}

export default Table
