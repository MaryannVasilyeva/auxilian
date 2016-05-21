import '../components/home.css'
import $ from 'jquery'
import React from 'react'
import Title from 'react-title-component'

require ('carousel.js')

$(document).ready( function () {
	$('.carousel').carousel({
		dist:0,
		shift:0,
		padding:20
	})
})

export default React.createClass({
  render() {
    return (
      <div>
        <Title render={prev => `${prev} | Home`}/>
          <p>Home!</p>
      </div>
    )
  }
})


