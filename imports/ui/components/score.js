import React, { PropTypes } from 'react'

const Score = ({ game }) => (
  <div className='mdl-card mdl-color--primary'>
    <div className='mdl-card__supporting-text mdl-color-text--primary-contrast'>
      <ul>
        {game.players.map(player =>
          <li key={player}>{player}</li>
        )}
      </ul>
    </div>
  </div>
)

Score.propTypes = {
  game: PropTypes.shape({
    players: PropTypes.arrayOf(PropTypes.string.isRequired)
  }).isRequired
}

export default Score
