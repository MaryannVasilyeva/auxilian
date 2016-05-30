import React from 'react'
import { Slider, Slide } from 'react-materialize'
import '../components/home.css'
import { slides } from '../styles.css'
class Carousel extends React.Component {

  constructor(props) {
    super(props)
  }
  
  render() {
    
    return (
      <div>
        <Slider>
          <Slide 
          src="./../images/volutnerr.jpg"
          title="Volunteer opportunities at your fingertips"
          >
          This is our small Tagline.
        </Slide>
        <Slide
          src="http://s33.postimg.org/r21fcgxxb/mapboxshow.jpg"
          title="Interactive Maps Powered by Mapbox"
          placement="left">
        </Slide>
        <Slide
          src="http://s1295.photobucket.com/user/tashahubner/media/volutnerr_zpsxtec55bf.jpg.html"
          title="Create a project and build your community"
          placement="right">
          This is our small Tagline.
        </Slide>
        </Slider>
        <div className="center">
          <a href="/about" className="btn-large">Learn More</a>
        </div>
      </div>
     
    )
  }
}

export default Carousel
