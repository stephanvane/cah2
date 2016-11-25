import React, { Component, PropTypes } from 'react'

// Czar
class Czar extends Component {
  constructor(props) {
    super(props)
    this.handleChooseWinner = this.handleChooseWinner.bind(this)
  }

  handleChooseWinner() {

  }

  render() {
    return (
      <div>
        <h1>Card Czar</h1>
        Choose the winning card!
        {this.props.cards.map(card => <Card
          card={card} key={card._id}
          click={this.handleChooseWinner}
        />)}
      </div>
    )
  }
}

export default Czar

// Czar.propTypes = {
//   cards: PropTypes.arrayOf(PropTypes.object),
//   game: Prop
// }
