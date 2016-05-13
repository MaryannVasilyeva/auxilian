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
    mapboxgl.accessToken = 'pk.eyJ1IjoidGh1YmVzIiwiYSI6ImNpbnV5bGczdjEyczF1YW0zeTVreTJudWIifQ.GeJpORzICTOTDUEcnY9nPw'
    
    let map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v8',
      center: [ -111.950684, 39.419220 ],
      zoom: 6
    }) 

    map.on('load', function () {
        map.addSource("markers", {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": [{
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [-111.89, 40.76]
                    },
                    "properties": {
                        "title": "You are here",
                        "marker-symbol": "marker"
                    }
                }]
            }
        })

        map.addLayer({
            "id": "markers",
            "type": "symbol",
            "source": "markers",
            "layout": {
                "icon-image": "{marker-symbol}-15",
                "text-field": "{title}",
                "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                "text-offset": [0, 0.6],
                "text-anchor": "top"
            }
        })
    })

    map.addControl(new mapboxgl.Navigation({position: 'top-left'}))

    var tooltip = new mapboxgl.Popup({closeOnClick: true})
      .setLngLat([-111.89, 40.76])
      .setHTML('<h1>You are here</h1>')
      .addTo(map);
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
