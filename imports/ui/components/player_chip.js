import React, { PropTypes } from 'react'
import classNames from 'classnames'

const PlayerChip = ({ player, colored = false }) => {
  const classes = classNames({
    'mdl-color--primary': colored,
    'mdl-color-text--primary-contrast': colored
  })

  return (
    <span key={player._id} className={`mdl-chip ${classes}`}>
      <span className='mdl-chip__text mdl-badge' data-badge={player.points}>
        {player._id}
      </span>
    </span>
  )
}

PlayerChip.propTypes = {
  player: PropTypes.shape({
    points: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired
  }).isRequired,
  colored: PropTypes.bool
}

export default PlayerChip
