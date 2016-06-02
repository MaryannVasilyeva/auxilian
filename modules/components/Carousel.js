import React from 'react'
import { Slider, Slide } from 'react-materialize'
import '../components/home.css'
import { slides, blue } from '../styles.css'
class Carousel extends React.Component {

  constructor(props) {
    super(props)
  }
  
  render() {
    
    return (
      <div>
        <Slider className={slides}
          >
          <Slide 
          src="http://s19.postimg.org/9rtkjhbv7/front.jpg"
          >
        </Slide>
        <Slide
          src="http://s19.postimg.org/ooaha1gsz/initiative2.jpg"
          >
        </Slide>
        <Slide
          src="http://s19.postimg.org/7jevv8bbn/mapboxshow.jpg"
          >
        </Slide>
        <Slide
          src="http://s19.postimg.org/8wt8s7zv7/human.jpg"
          >
        </Slide>
        <Slide
          src="http://s19.postimg.org/5f8t6a79v/inthistogether.jpg"
          >
        </Slide>
        </Slider>
        <div className="center">
          <a href="/about" className="btn-large" id={blue}>Learn More</a>
        </div>
      </div>
     
    )
  }
}

export default Carousel
