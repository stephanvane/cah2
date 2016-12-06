import React, { PropTypes } from 'react'
import classNames from 'classnames'

const Score = ({ players, currentPlayerId, czarId }) => (
  <ul className='mdl-list'>
    {players.map((player) => {
      const c = classNames(
        {
          'mdl-color--primary': player._id === currentPlayerId,
          'mdl-color-text--primary-contrast': player._id === currentPlayerId
        },
        'mdl-list__item')

      return (
        <li className={c} key={player._id}>
          <span className='mdl-list__item-primary-content'>{player._id}</span>
          <span className='mdl-list__item-secondary-content'>
            <span className='mdl-chip'><span className='mdl-chip__text'>{player.points}</span></span>
          </span>
          {(player._id === czarId) &&
            <span className='mdl-chip'><span className='mdl-chip__text'>Czar</span></span>
          }
        </li>
      )
    })}
  </ul>
)

Score.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
  currentPlayerId: PropTypes.string,
  czarId: PropTypes.string
}

export default Score
