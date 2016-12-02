import React, { PropTypes } from 'react'

const Card = ({ card, hidden, onClick }) => (
  <div className={`mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--2-col-phone card card--${card.type}`} onClick={onClick}>
    <div className='mdl-card mdl-shadow--2dp'>
      <div className='mdl-card__supporting-text'>{(hidden) ? '' : card.text}</div>
    </div>
  </div>
)

Card.propTypes = {
  card: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  }).isRequired,
  hidden: PropTypes.bool
}

export default Card
