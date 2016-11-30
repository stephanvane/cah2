import React, { Component, PropTypes } from 'react'

export default class Card extends Component {
  constructor(props) {
    super(props)
    this._onClick = this._onClick.bind(this)
  }

  _onClick() {
    if (this.props.click) this.props.click(this.props.card._id)
  }

  render() {
    const card = this.props.card
    const cardText = (this.props.hidden) ? '' : card.text

    return (
      <div className={`mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--2-col-phone card card--${card.type}`} onClick={this._onClick}>
        <div className='mdl-card mdl-shadow--2dp'>
          <div className='mdl-card__supporting-text'>{cardText}</div>
        </div>
      </div>
    )
  }
}
Card.propTypes = {
  card: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  }).isRequired,
  hidden: PropTypes.bool,
  click: PropTypes.func,
}
