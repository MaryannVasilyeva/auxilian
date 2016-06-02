import React from 'react'
import $ from 'jquery'
import { green, inline, footer, space, bigspace } from '../styles.css'
import { Link } from 'react-router'

class Footer extends React.Component {
  constructor(props) {
    super(props)
  }

   componentDidMount() {
    $('#links').click( function () {
      $('#mo').toggle('show')
    })
  }

  render() {
    return(
      <div className={footer}>
        <footer className="page-footer" id={green}>
          <div className="footer-copyright">
            <div className="container">
            © 2016 Copyright &nbsp; &nbsp; Auxilian 
            <Link className="grey-text text-lighten-4 right" id={space} to="http://www.volunteermatch.org/" target="_blank">Volunteer Match</Link>
            <Link className="grey-text text-lighten-4 right" id={space} to="http://slco.org/volunteer/" target="_blank">SLC Volunteer</Link>
            <Link className="grey-text text-lighten-4 right" id={space} to="https://twitter.com/auxvolunteers" target="_blank">Twitter</Link>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}

export default Footer
