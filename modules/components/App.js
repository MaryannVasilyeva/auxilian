import React from 'react'
import { Link } from 'react-router'
import Title from 'react-title-component'
import { connect } from 'react-redux'
import { logout, loggedIn } from './actions'
import $ from 'jquery'


const mapStateToProps = (state) => {
  return { 
    auth: state.auth.isAuthenticated
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (sessionStorage.token && !this.props.auth)
      this.props.dispatch(loggedIn(sessionStorage.userId, sessionStorage.token))
  }

  //componentDidMount() {
    //after component loads initialize materialize sidebar javascript
    // this is not working yet
    //$('.button-collapse').sideNav()
  //}

  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper green lighten-3">
            <a href="/" className="brand-logo center">Auxilian</a>
            <a href="#" data-activates="#side_nav" className="button-collapse"><i className="material-icons">menu</i></a>
            <ul className="right hide-on-med-and-down">
              <li>
              {this.props.auth ? (
                <a href="#"
                  onClick={ e => {
                    {
                      e.preventDefault()
                      this.props.dispatch(logout())
                      this.props.history.push('/login')
                    }
                  }}
                >
                  Log out
                </a>
              ) : (<Link to="/login">Sign In</Link>)}
              </li>
              <li><Link to="/dashboard" >Dashboard</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
            <ul className="side-nav" id="side-nav">
              <li>
              {this.props.auth ? (
                <a href="#"
                  onClick={ e => {
                    {
                      e.preventDefault()
                      this.props.dispatch(logout())
                      this.props.history.push('/login')
                    }
                  }}
                >
                  Log out
                </a>
              ) : (<Link to="/login">Sign In</Link>)}
              </li>
              <li><Link to="/dashboard" >Dashboard</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </div>
        </nav>
        {this.props.children}
        <footer className="page-footer green lighten-3">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">Auxilian</h5>
                <p className="grey-text text-lighten-4">Thank you for visting our website!</p>
              </div>
              <div className="col l6 s12">
                <h5 className="white-text">Links</h5>
                <ul>
                  <li><a className="grey-text text-lighten-3" href="http://www.volunteermatch.org/">Volunteer Match</a></li>
                  <li><a className="grey-text text-lighten-3" href="http://slco.org/volunteer/">SLC Volunteer</a></li>
                  <li><a className="grey-text text-lighten-3" href="https://www.facebook.com">Facebook</a></li>
                  <li><a className="grey-text text-lighten-3" href="https://twitter.com">Twitter</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
            © 2016 Copyright Text
            <a className="grey-text text-lighten-4 right" href="#!"></a>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(App)
