import React from 'react'
import { green, inline } from '../styles.css'

const Footer = () => (

  <div>
    <footer className="page-footer" id={green}>
      <div className="container">
        <div className="row">
          <div className="col m6 s12">
            <h5 className="white-text">Auxilian</h5>
            <p className="grey-text text-lighten-4">Thank you for visting our website!</p>
          </div>
          <div className="col m6 s12">
            <h5 className="white-text">Links</h5>
            <ul className={inline}>
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

export default Footer
