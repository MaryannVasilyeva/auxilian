import React from 'react'
import $ from 'jquery'
import { connect } from 'react-redux'
import Map from './Map'
import { mapThing } from '../styles.css'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.addRequest = this.addRequest.bind(this)
    this.getCoordinates = this.getCoordinates.bind(this)
    this.loadMap = this.loadMap.bind(this)
    this.state = { requests: [] }
  }

  componentDidMount() {
    this.loadMap([ -111.950684, 39.419220 ])
  }

  loadMap(coordinates) {
    let mapboxgl = window.mapboxgl
    mapboxgl.accessToken = 'pk.eyJ1IjoibXZhc2lseWV2YSIsImEiOiJjaW51dnZobXIxMm5odWdseWVzanI4d2s1In0.RQNmugJct0lHOOlcFyCeRA'
    let map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v8',
      center: [ -111.950684, 39.419220 ],
      zoom: 6
    }) 
    map.on('load', function () {
      console.log(coordinates)
        map.addSource("markers", {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": [ {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": coordinates
                    },
                    "properties": {
                        "title": "You are here",
                        "marker-symbol": "marker"
                    }
                } ]
            }
        })

        map.addLayer({
            "id": "markers",
            "type": "symbol",
            "source": "markers",
            "layout": {
                "icon-image": "{marker-symbol}-15",
                "text-field": "{title}",
                "text-font": [ "Open Sans Semibold", "Arial Unicode MS Bold" ],
                "text-offset": [ 0, 0.6 ],
                "text-anchor": "top"
            }
        })
    })

    map.addControl(new mapboxgl.Navigation({ position: 'top-left' }))

  }

  componentWillMount() {
    const id = this.props.auth.id
    $.ajax({
      url: `/api/requests/${id}`,
      type: 'GET',
      dataType: 'JSON',
      contentType: 'application/json',
      data: { id: id }
    }).done( requests => {
      this.setState({ requests: requests })
    })
  }

  getCoordinates(e) {
    e.preventDefault()
    var address = this.refs.coord.value
    $.ajax({
      url: '/api/requests?address=' + this.refs.coord.value,
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
     })
     this.refs.text.value = ''
     this.refs.desc.value = ''
     this.refs.coord.value = '' 
  }

  render() {
    const token = this.props.auth.token
    const id = this.props.auth.id
    debugger
    let requests = this.state.requests.map( request => {
      return <li key={request._id}>{request.text}</li>
    })

  return (
    <div>
      <div>
        <h1>Dashboard</h1>
      </div>
      <div style={{ float: "right" }}>
        <form onSubmit={(e) => this.getCoordinates(e)}>
          <input ref="text" placeholder="Volunteer Event Title" />
          <input ref="desc" placeholder="Description of Event" />
          <input ref="coord" placeholder="Location of Event" />
          <button type="submit">Add</button>
        </form>
      </div>
        <div id='geocoder-container'></div>
          {this.props.coordinates}
        <div id="map" className={mapThing}></div>
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
