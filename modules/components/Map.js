import React from 'react'
import $ from 'jquery'
import { connect } from 'react-redux'
import { mapThing } from '../styles.css'

class Map extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let mapboxgl = window.mapboxgl
    mapboxgl.accessToken = 'pk.eyJ1IjoibXZhc2lseWV2YSIsImEiOiJjaW51dnV3eDUxMm5jdWdseXR3dW1wazRoIn0.l7HVScO-ipfCEwOmvDuGsg'
    let map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v8',
      center: [ -111.950684, 39.419220 ],
      zoom: 6
    })   
  }

  render() {
    
  return (
      <div>
        <div id="map" className={mapThing}></div>
      </div> 
    )
  }
}

export default Map
