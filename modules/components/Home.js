import '../components/home.css'
import $ from 'jquery'
import React from 'react'
import Title from 'react-title-component'

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
        <div className="carousel">
      	 <a className="carousel-item" href="#one!"><img src="http://s20.postimg.org/hkv63rpul/Game_Over.jpg"/></a>
      	 <a className="carousel-item" href="#two!"><img src="http://s20.postimg.org/es1yjqpi5/Photo_Jul_28_10_13_38_AM.jpg"/></a>
      	 <a className="carousel-item" href="#three!"><img src="http://s20.postimg.org/3tqp1k0wt/Manhattan_Henge.jpg"/></a>
      	 <a className="carousel-item" href="#four!"><img src="http://s20.postimg.org/9kgvfa8wt/Photo_Jul_28_10_10_23_AM.jpg"/></a>
      	 <a className="carousel-item" href="#five!"><img src="http://s20.postimg.org/fmtk2w3od/20141001_190033.jpg"/></a>
        </div>
      </div>
    )
  }
})

