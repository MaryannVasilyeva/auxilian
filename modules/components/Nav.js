import React from 'react'
import { Link } from 'react-router'
import Title from 'react-title-component'
import { connect } from 'react-redux'
import { logout, loggedIn } from './actions'
import $ from 'jquery'
import { logo, nav, green, nomargin, navItem, noborder } from '../styles.css'
import Login from './Login'
import { Navbar, NavItem, Image } from 'react-bootstrap'


const mapStateToProps = (state) => {
  return { 
    auth: state.auth.isAuthenticated
  }
}

class Nav extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (sessionStorage.token && !this.props.auth)
      this.props.dispatch(loggedIn(sessionStorage.userId, sessionStorage.token))
  }

  render() {
    return (
      <Navbar inverse fluid id={nav} className={noborder}>
        <Navbar.Header>
          <Navbar.Brand className={nomargin}>
            <a href="/">
              <Image className={logo} responsive src="http://i1295.photobucket.com/albums/b626/tashahubner/logowhite_zpsjs30hbvu.png" />
            </a>
          </Navbar.Brand>
          <Navbar.Toggle className={noborder} id={green}/>
        </Navbar.Header>
        <Navbar.Collapse id={green} className={noborder}>
          <ul className="right">
            <li>
            {this.props.auth ? (
              <a className={navItem} href="#"
                onClick={ e => {
                  {
                    e.preventDefault()
                    this.props.dispatch(logout())
                  }
                }}
              >
                Log out
              </a>
            ) : (<Link to="/login" className={navItem}>Sign In</Link>)}
            </li>
            <li>
            {this.props.auth ? (<Link to="/dashboard" className={navItem} >Dashboard</Link>) : f => f}
            </li>
            <li><Link to="/about" className={navItem}>About</Link></li>
          </ul>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default connect(mapStateToProps, null)(Nav)
