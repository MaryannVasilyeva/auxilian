// import React from 'react'
// import $ from 'jquery'
// import { connect } from 'react-redux'
// import { mapThing } from '../styles.css'

// class Map extends React.Component {
//   constructor(props) {
//     super(props)
//     this.getCoordinates = this.getCoordinates.bind(this)
//     this.loadMap = this.loadMap.bind(this)
//   }


//     componentDidMount() {
//     this.loadMap([ -111.89, 40.7 ])
//   }

//   loadMap(coordinates) {
//     let mapboxgl = window.mapboxgl
//     mapboxgl.accessToken = 'pk.eyJ1IjoibXZhc2lseWV2YSIsImEiOiJjaW51dnZobXIxMm5odWdseWVzanI4d2s1In0.RQNmugJct0lHOOlcFyCeRA'
//     let map = new mapboxgl.Map({
//       container: 'map',
//       style: 'mapbox://styles/mapbox/streets-v8',
//       center: [ -111.89, 40.7 ],
//       zoom: 10
//     }) 

//     let markers = {
//       "type": "FeatureCollection",
//       "features": [ {
//           "type": "Feature",
//           "geometry": {
//               "type": "Point",
//               "coordinates": coordinates
//           },
//           "properties": {
//               "title": "Test",
//               "marker-symbol": "marker"
//           }
//       } ]
//     }


//     map.on('load', function () {
//       console.log(markers)
//         map.addSource("markers", {
//             "type": "geojson",
//             "data": markers
//         })

//         map.addLayer({
//             "id": "markers",
//             "type": "symbol",
//             "source": "markers",
//             "layout": {
//                 "icon-image": "{marker-symbol}-15",
//                 "text-field": "{title}",
//                 "text-font": [ "Open Sans Semibold", "Arial Unicode MS Bold" ],
//                 "text-offset": [ 0, 0.6 ],
//                 "text-anchor": "top"
//             }
//         })

//       map.addControl(new mapboxgl.Geocoder({ position: 'top-left' }))
    
//     })  

//   }


// export default Map
