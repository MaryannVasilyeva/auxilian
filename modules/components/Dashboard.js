import React from 'react'
import $ from 'jquery'
import { connect } from 'react-redux'
import Map from './Map'
import { mapThing, big, requestTitle, thisDiv } from '../styles.css'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.addRequest = this.addRequest.bind(this)
    this.loadMap = this.loadMap.bind(this)
    this.state = { requests: [] }
  }

  componentDidMount() {
    $.ajax({
      url: '/api/requests',
      type: 'GET'
    }).done( requests => {
      this.setState({ requests: requests })
      this.loadMap()
    })
  }


  loadMap() {
    let mapboxgl = window.mapboxgl
    mapboxgl.accessToken = 'pk.eyJ1IjoibXZhc2lseWV2YSIsImEiOiJjaW51dnZobXIxMm5odWdseWVzanI4d2s1In0.RQNmugJct0lHOOlcFyCeRA'

    let map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v8',
      center: [ -111.89, 40.7 ],
      zoom: 10
    }) 

    let userRequests = this.state.requests.filter( req => req.properties.userId === this.props.auth.id )
    let nonUserRequests = this.state.requests.filter( req => req.properties.userId !== this.props.auth.id )
     
    let userFeatures = userRequests.map( request => {
      return {

        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": request.geometry.coordinates
        },
        "properties": {
            "title": request.properties.title,
            "description": request.properties.description,
            "userId": request.properties.userId,
            "marker-symbol": "marker"
        }
      }
    })

    let nonUserFeatures = nonUserRequests.map( request => {
      return {

        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": request.geometry.coordinates
        },
        "properties": {
            "title": request.properties.title,
            "description": request.properties.description,
            "userId": request.properties.userId,
            "marker-symbol": "harbor"
        }
      }
    })

    let userMarkers = {
      "type": "FeatureCollection",
      "features": userFeatures
    }

    let nonUserMarkers = {
      "type": "FeatureCollection",
      "features": nonUserFeatures
    }
    

    map.on('load', function () {

      map.addSource("userMarkers", {
        "type": "geojson",
        "data": userMarkers
      })

      map.addLayer({
        "id": "userMarkers",
        "type": "symbol",
        "source": "userMarkers",
        "layout": {
            "icon-image": "{marker-symbol}-15",
            "icon-allow-overlap": true,
            "text-field": "{title}",
            "text-font": [ "Open Sans Semibold", "Arial Unicode MS Bold" ],
            "text-offset": [ 0, 0.6 ],
            "text-anchor": "top"
        }
      })

      map.addSource("nonUserMarkers", {
        "type": "geojson",
        "data": nonUserMarkers
      })

      map.addLayer({
        "id": "nonUserMarkers",
        "type": "symbol",
        "source": "nonUserMarkers",
        "layout": {
            "icon-image": "{marker-symbol}-15",
            "icon-allow-overlap": true,
            "text-field": "{title}",
            "text-font": [ "Open Sans Semibold", "Arial Unicode MS Bold" ],
            "text-offset": [ 0, 0.6 ],
            "text-anchor": "top"
        }
      })


      map.addControl(new mapboxgl.Geocoder({ position: 'top-left' }))

    }) 

    map.on('click', function (e) {
        let features = map.queryRenderedFeatures(e.point, { layers: [ 'markers' ] })

        if (!features.length) {
            return
        } else {
          map.flyTo({ center: features[0].geometry.coordinates })
        }

        let feature = features[0]

        let popup = new mapboxgl.Popup()
            .setLngLat(feature.geometry.coordinates)
            .setHTML(`
              ${feature.properties.title} <br />
              ${feature.properties.description} <br />
              <a href="#">${feature.properties.userId}</a>
            `)
            .addTo(map)

    })

    map.on('mousemove', function (e) {
        let features = map.queryRenderedFeatures(e.point, { layers: [ 'markers' ] })
        map.getCanvas().style.cursor = (features.length) ? 'pointer' : ''
    })

  }

  getCoordinates(e) {
    e.preventDefault()
    var address = this.refs.coord.value
    $.ajax({
      url: '/api/mapbox?address=' + this.refs.coord.value,
      type: 'GET'
     }).done( response => {
      this.addRequest(this.props.auth.id, response.features[0].center)
      this.loadMap(response.features[0].center)
    })
  }

  addRequest(id, coords) {
    $.ajax({
      url: '/api/requests',
      type: 'POST',
      dataType: 'JSON',
      contentType: 'application/json',
      data: JSON.stringify({ 
        text: this.refs.text.value, 
        desc: this.refs.desc.value,
        coord: coords,
        id: id 
      })
    }).done( request => {
      this.setState({ requests: [ ...this.state.requests, request ] })
      console.log(request)
      this.refs.text.value = ''
      this.refs.desc.value = ''
      this.refs.coord.value = '' 
      this.loadMap()
    })
  }

  render() {
    const token = this.props.auth.token
    const id = this.props.auth.id
    let requests = this.state.requests.map( request => {
      return(
        <div className="row">
          <div className="col s12 m6">
             <div className="card blue-grey darken-1">
               <div className="card-content white-text">
                  <p key={request._id}>
                  Title: {request.properties.title} <hr></hr>
                  Description: {request.properties.description} <hr></hr> 
                  Address: {request.geometry.coordinates} <br/>
                  </p>
              </div>
          </div>
        </div>
      </div>
      )
    })

  return (
    <div id={ big }>
      <div style={{ float: "right" }}>
        <form onSubmit={(e) => this.getCoordinates(e)}>
          <input ref="text" placeholder="Volunteer Event Title" />
          <input ref="desc" placeholder="Description of Event" />
          <input ref="coord" placeholder="Location of Event" />
          <button className="btn"type="submit">Add</button>
        </form>
        <br />
        <h4 id={requestTitle}>Current Requests</h4>
         <div className={thisDiv}>{requests}</div>
      </div>
      <div>
        <div id="map" className={mapThing}></div>
      </div> 
    </div>
   )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: { token: state.auth.token, id: state.auth.id }
  }
}

export default connect(mapStateToProps)(Dashboard)
