import React from 'react'
import { Link } from 'react-router'
import Title from 'react-title-component'
import { connect } from 'react-redux'
import { logout, loggedIn } from './actions'
import $ from 'jquery'
import Login from './Login'
import Nav from './Nav'
import Footer from './Footer'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (sessionStorage.token && !this.props.auth)
      this.props.dispatch(loggedIn(sessionStorage.userId, sessionStorage.token))
  }


  render() {
    return (
      <div>
        <Nav />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { 
    auth: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps, null)(App)
