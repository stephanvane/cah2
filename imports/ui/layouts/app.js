import React, { Component, PropTypes } from 'react'
import { Template } from 'meteor/templating'
import { Blaze } from 'meteor/blaze'

export default class App extends Component {
  componentDidMount() {
    this.view = Blaze.render(Template.loginButtons, this.loginContainer)
  }

  componentWillUnmount() {
    Blaze.remove(this.view)
  }

  render() {
    return (
      <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header'>
        <div className='mdl-layout__header'>
          <div className='mdl-layout__header-row'>
            <div ref={(c) => { this.loginContainer = c }} />
          </div>
        </div>
        <main className='mdl-layout__content'>
          {this.props.children}
        </main>
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node
}
