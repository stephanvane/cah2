import React, { Component, PropTypes } from 'react'
import { Template } from 'meteor/templating'
import { Blaze } from 'meteor/blaze'
import { Provider } from 'react-redux'
import Store from '../store'

export default class App extends Component {
  componentDidMount() {
    this.view = Blaze.render(Template.loginButtons, this.loginContainer)
  }

  componentWillUnmount() {
    Blaze.remove(this.view)
  }

  render() {
    return (
      <Provider store={Store}>
        <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header'>
          <div className='mdl-layout__header'>
            <div className='mdl-layout__header-row'>
              <div ref={(c) => { this.loginContainer = c }} />
            </div>
          </div>
          <main className='mdl-layout__content'>
            {this.props.children}
            <div className='mdl-js-snackbar mdl-snackbar'>
              <div className='mdl-snackbar__text' />
              <div className='mdl-snackbar__action' />
            </div>
          </main>
        </div>
      </Provider>
    )
  }
}

App.propTypes = {
  children: PropTypes.node
}
