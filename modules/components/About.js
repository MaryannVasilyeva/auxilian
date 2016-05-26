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
            <td><img className='z-depth-3' src='http://s20.postimg.org/5ox49hhul/tasha1.jpg' /></td>
            <td><img className='z-depth-3' src='http://s20.postimg.org/544b1kkgt/AC_Head_Shot_copy.jpg' /></td>
            <td><img className='z-depth-3' src='http://s20.postimg.org/5ox49hhul/tasha1.jpg' /></td>
          </tr>
          <tr>
            <td>Tasha Hubner</td>
            <td>Aaron Campbell</td>
            <td>MaryAnn Vasilyeva</td>
          </tr>
        </tbody>
      </table>
  </div>
)
