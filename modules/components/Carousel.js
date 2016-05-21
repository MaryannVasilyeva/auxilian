import React from 'react'
import { Slider, Slide } from 'react-materialize'
import '../components/home.css'

class Carousel extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Slider>
        <Slide
        src="http://s20.postimg.org/hkv63rpul/Game_Over.jpg"
        title="This is our big Tagline!">
        Here's our small slogan.
      </Slide>
      <Slide
        src="http://s20.postimg.org/9kgvfa8wt/Photo_Jul_28_10_10_23_AM.jpg"
        title="Left aligned Caption"
        placement="left">
        Here's our small slogan.
      </Slide>
      <Slide
        src="http://s20.postimg.org/3tqp1k0wt/Manhattan_Henge.jpg"
        title="Right aligned Caption"
        placement="right">
        Here's our small slogan.
      </Slide>
      <Slide
        src="http://s20.postimg.org/qe5gq3eal/buble_7.jpg"
        title="Right aligned Caption"
        placement="right">
        Here's our small slogan.
      </Slide>
      <Slide
        src="http://s20.postimg.org/hkv63rpul/Game_Over.jpg"
        title="Right aligned Caption"
        placement="right">
        Here's our small slogan.
      </Slide>
      <Slide
        src="http://s20.postimg.org/fmtk2w3od/20141001_190033.jpg"
        title="Right aligned Caption"
        placement="right">
        Here's our small slogan.
      </Slide>
      </Slider>
    )
  }
}

export default Carousel
