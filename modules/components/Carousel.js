import React from 'react'
import { Slider, Slide } from 'react-materialize'
import '../components/home.css'
import Login from './Login'
import { slides } from '../styles.css'
class Carousel extends React.Component {

  constructor(props) {
    super(props)
  }
  
  render() {
    
    return (
      <div>
      <Slider
      className={slides} 
      indicators={false}
      transition={2000}
      interval={3000}
      >
        <Slide 
        src="http://s20.postimg.org/hkv63rpul/Game_Over.jpg"
        title="This is our big Tagline!"
        >
        This is our small Tagline.
      </Slide>
      <Slide
        src="http://ccnwfl.org/wp-content/uploads/2011/11/istock_000016475829medium.jpg"
        title="Left aligned Caption"
        placement="left">
        This is our small Tagline.
      </Slide>
      <Slide
        src="http://s20.postimg.org/3tqp1k0wt/Manhattan_Henge.jpg"
        title="Right aligned Caption"
        placement="right">
        This is our small Tagline.
      </Slide>
      </Slider>
      <Login />
      </div>
     
    )
  }
}

export default Carousel
