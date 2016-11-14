import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Template } from 'meteor/templating'
import { Blaze } from 'meteor/blaze'

export default class App extends Component {
  componentDidMount() {
    this.view = Blaze.render(Template.loginButtons,
                             ReactDOM.findDOMNode(this.refs.loginContainer))
  }

  componentWillUnmount() {
    Blaze.remove(this.view)
  }

  render() {
    return (
      <div className='container'>
        <div ref='loginContainer'></div>
        {this.props.children}
      </div>
    )
  }
}
