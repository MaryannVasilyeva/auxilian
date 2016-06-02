import React, { Component } from 'react'
import { login, signUp } from './actions'
import { connect } from 'react-redux'
import $ from 'jquery'
import { blue, backgroundImage } from '../styles.css'


class Login extends Component {
  constructor(props) {
    super(props)
    this.signUp = this.signUp.bind(this)
    this.signIn = this.signIn.bind(this)
    const redirectLocation = '/dashboard'
    this.state = { error: false, redirectRoute: redirectLocation }
  }
  componentDidMount() {
    $('#up').click( function () {
      $('.su').toggle('show')
    }),
    $('#in').click( function () {
      $('.si').toggle('show')
    })
  }

  signUp(event) {
    event.preventDefault()
    const email = this.refs.newEmail.value
    const pass = this.refs.newPass.value
    this.props.dispatch(signUp(email, pass, this.state.redirectRoute, this.props.history))
    this.refs.signUpForm.reset()
  }

  signIn(event) {
    event.preventDefault()
    const email = this.refs.email.value
    const pass = this.refs.pass.value
    this.props.dispatch(login(email, pass, this.state.redirectRoute, this.props.history))
    this.refs.signInForm.reset()
  }

  render() {

    return (
      <div id={backgroundImage}>
      <div className="container">
        <div className="row">
          <div className="col s12 m6 center">
            <h2 className="btn-large" id="up">Sign Up</h2>
            <form className="su" style={{ display: 'none' }} ref="signUpForm" onSubmit={this.signUp}>
              <input className={white} type="text" ref="newEmail" placeholder="email" />
              <input type="password" ref="newPass" placeholder="password"/>
              <br />
              <button id={blue} className="btn" type="submit">sign up</button>
            </form>
          </div>
          <div className="col s12 m6 center">
            <h2 className="btn-large" id="in">Sign In</h2>
            <form className="si" style={{ display: 'none' }} ref="signInForm" onSubmit={this.signIn}>
              <input type="text" ref="email" placeholder="email" />
              <input type="password" ref="pass" placeholder="password" />
              <br />
              <button id={blue} className="btn" type="submit">login</button>
            </form>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default connect()(Login)
