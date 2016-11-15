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
    const panelColor = !(this.props.card.type === 'white') ? 'white' : 'black'
    const textColor = !(this.props.card.type === 'white') ? 'black' : 'wite'

    return (
      <div className='col s6 m4 l3'>
        <div className='card-panel white' onClick={this._onClick}>
          <div className='black-text'>{this.props.card.text}</div>
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
  click: PropTypes.func
}
