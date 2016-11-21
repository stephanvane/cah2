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
    const panelColor = (card.type === 'white') ? 'white' : 'black'
    const textColor = (card.type === 'white') ? 'black' : 'white'
    const cardText = (card.hidden) ? '' : card.text

    return (
      <div className='col s6 m4 l3'>
        <div className={`card-panel ${panelColor}`} onClick={this._onClick}>
          <div className={`${textColor}-text`}>{cardText}</div>
        </div>
      </div>
    )
  }
}
Card.propTypes = {
  card: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    hidden: PropTypes.string
  }).isRequired,
  click: PropTypes.func,
}
