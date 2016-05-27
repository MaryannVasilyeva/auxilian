import React from 'react'
import { big } from '../styles.css'

export default () => (
  <div className="center" id={big}>
    <h2>About Us</h2>
    <br />
    <p>Auxilian was designed and built as a humanitarian effort to connect individuals searching for volunteer work to bring communities closer together.</p>
    <br />
    <p>Volunteer to help a neighbor</p>
    <p>Create a project to fill a need that you see</p>
    <p>Reach out to those around you when you need help</p>
    <br />
    <p>Small acts of kindness can change the world!</p>
    <p>Sign up today!</p>
    <p>Meet our Devolopers</p>
      <table className='col l6 s12'>
        <tbody>
          <tr>
            <td><img className='z-depth-3' src='http://s20.postimg.org/nssqx3nq5/tasha5.jpg' height='23%' /></td>
            <td><img className='z-depth-3' src='http://s20.postimg.org/ybo58j10d/AC4.jpg' height='99%' /></td>
            <td><img className='z-depth-3' src='http://s20.postimg.org/g6b6uh1i5/Maryann5.jpg' height='99%' /></td>
          </tr>
          <tr>
            <td>Tasha Hubner</td>
            <td>Aaron Campbell</td>
            <td>MaryAnn Vasilyeva</td>
          </tr>
        </tbody>
      </table>
      <br />
  </div>
)
