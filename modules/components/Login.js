import React, { Component } from 'react'
import { login, signUp } from './actions'
import { connect } from 'react-redux'
import { blue } from '../styles.css'

class Login extends Component {
  constructor(props) {
    super(props)
    this.signUp = this.signUp.bind(this)
    this.signIn = this.signIn.bind(this)
    this.signInToggleShow = this.signInToggleShow.bind(this)
    this.signUpToggleShow = this.signUpToggleShow.bind(this)
    const redirectLocation = '/dashboard'
    this.state = { error: false, redirectRoute: redirectLocation, signInShow: false, signUpShow: false }
  }

  signInToggleShow() {
    this.setState({ signInShow: !this.state.signInShow })
  }

  signUpToggleShow() {
    this.setState({ signUpShow: !this.state.signUpShow })
  }


  signUp(event) {
    event.preventDefault()

    const email = this.refs.newEmail.value
    const pass = this.refs.newPass.value
    this.props.dispatch(signUp(email, pass, this.state.redirectRoute, this.props.history))
  }

  signIn(event) {
    event.preventDefault()

    const email = this.refs.email.value
    const pass = this.refs.pass.value
    this.props.dispatch(login(email, pass, this.state.redirectRoute, this.props.history))
  }

  signUpRender() {
    return(
      <div className="container center" style={{ width: 400 }}>
        <h2>Join Us!</h2>
        <form onSubmit={ (e) => {this.signUp}}>
          <input ref="newEmail" placeholder="email" />
          <input ref="newPass" type="password" placeholder="password"/>
          <br />
          <button className="btn btn-large" id={blue} type="submit">Sign Up</button>
        </form>
        <br />
        <button className="btn btn-large" id={blue} onClick={this.signUpToggleShow}>Cancel</button>
      </div>
    )
  }

  signInRender() {
    return(
      <div className="container center" style={{ width: 400 }}>
        <h2>Sign In</h2>
        <form onSubmit={ (e) => {this.signIn}}>
          <input type="text" ref="email" placeholder="email" />
          <input ref="pass" type="password" placeholder="password" />
          <br />
          <button className="btn btn-large" id={blue} type="submit">Submit</button>
           {this.state.error && (
             <p>Bad login information</p>
           )}
        </form>
        <br />
        <button className="btn btn-large" id={blue} onClick={this.signInToggleShow}>Cancel</button>
      </div>
    )
  }

  buttons() {
    return (
      <div className="center container" style={{ width: 400 }}>
        <button className="btn btn-large" id={blue} onClick={this.signUpToggleShow}>Sign Up</button>
        {' '}
        <button className="btn btn-large" id={blue} onClick={this.signInToggleShow}>Sign In</button>
        
      </div>
    )
  }


  render() {
    if (this.state.signInShow) 
      return this.signInRender()
    else if (this.state.signUpShow)
      return this.signUpRender()
    else
      return this.buttons()
  }
}

export default connect()(Login)
