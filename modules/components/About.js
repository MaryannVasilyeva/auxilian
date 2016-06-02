import React from 'react'
import { about, big, us, headings, blueText, greenText, blue, largeText, medText } from '../styles.css'

export default () => (
  <div className="center" id={big}>
    <img className="center" src="http://s19.postimg.org/naepkd93n/makeadifference.jpg" />
    <br />
    <div className={about}>
      <p className={largeText}>Auxilian was designed and built as a humanitarian effort</p> 
      <p className={largeText}>to connect individuals searching for volunteer work</p>
      <p className={largeText}>and to bring communities closer together.</p>
      <br />
      <p className={medText}>~ Volunteer to help a neighbor ~</p>
      <p className={medText}>~ Create a project to fill a need that you see ~</p>
      <p className={medText}>~ Reach out to those around you when you need help ~</p>
      <br />
      <p className={largeText}>Small acts of kindness can change the world!</p>
      <br />
      <a href="/login" className="btn" id={blue}>Sign up today!</a>
    </div>
    <br />
    <h1 id={greenText}>Meet our Developers</h1>
      <table className="col l6 s12 center" id={us}>
        <tbody>
          <tr>
            <td className="center"><h2 id={blueText}>Tasha Johnson</h2></td>
            <td className="center"><h2 id={blueText}>Aaron Campbell</h2></td>
            <td className="center"><h2 id={blueText}>Maryann Vasilyeva</h2></td>
          </tr>
          <tr>
            <td className="center"><img className="z-depth-3" src="http://s19.postimg.org/4cfqxv1hv/tasha5.jpg" height="23%" /></td>
            <td className="center"><img className="z-depth-3" src="http://s20.postimg.org/ybo58j10d/AC4.jpg" height="99%" /></td>
            <td className="center"><img className="z-depth-3" src="http://s20.postimg.org/g6b6uh1i5/Maryann5.jpg" height="99%" /></td>
          </tr>
        </tbody>
      </table>
  </div>
)
