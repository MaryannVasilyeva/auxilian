import React from 'react'
import $ from 'jquery'
import { connect } from 'react-redux'
import Map from './Map'
import { mapThing, big, requestTitle, thisDiv, hideDiv } from '../styles.css'
import { ResponsiveEmbed } from 'react-bootstrap'
import { Collapsible, CollapsibleItem } from 'react-materialize'
import { addRequests } from './actions'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.addRequest = this.addRequest.bind(this)
    this.deleteRequest = this.deleteRequest.bind(this)
    this.getRequests = this.getRequests.bind(this)
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
    }),
    $('#add').click( function () {
      $('#addForm').toggle('show')
    }),
    $('#serve').click( function () {
      $('#list').toggle('show')
    })
  }


  loadMap() {
    let mapboxgl = window.mapboxgl
    mapboxgl.accessToken = 'pk.eyJ1IjoibXZhc2lseWV2YSIsImEiOiJjaW51dnZobXIxMm5odWdseWVzanI4d2s1In0.RQNmugJct0lHOOlcFyCeRA'

    let map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [ -111.89, 40.7 ],
      zoom: 10
    }) 

    let userRequests = this.state.requests.filter( req => req.properties.userId === this.props.auth.id )
    let nonUserRequests = this.state.requests.filter( req => req.properties.userId !== this.props.auth.id )
     
    let userFeatures = userRequests.map( request => {
      return {

        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': request.geometry.coordinates
        },
        'properties': {
            'title': request.properties.title,
            'description': request.properties.description,
            'userId': request.properties.userId,
            'requestId': request._id,
            'contact': request.properties.info
        }
      }
    })

    let nonUserFeatures = nonUserRequests.map( request => {
      return {

        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': request.geometry.coordinates
        },
        'properties': {
            'title': request.properties.title,
            'description': request.properties.description,
            'userId': request.properties.userId,
            'contact': request.properties.info
          
        }
      }
    })

    let userMarkers = {
      'type': 'FeatureCollection',
      'features': userFeatures
    }

    let nonUserMarkers = {
      'type': 'FeatureCollection',
      'features': nonUserFeatures
    }
    

    map.on('load', function () {

      map.addSource('userMarkers', {
        'type': 'geojson',
        'data': userMarkers
      })

      map.addLayer({
        'id': 'userMarkers',
        'type': 'circle',
        'source': 'userMarkers',
        'paint': {
          'circle-radius': 10,
          'circle-color': '#1976d2'
        }
      })

      map.addSource('nonUserMarkers', {
        'type': 'geojson',
        'data': nonUserMarkers
      })

      map.addLayer({
        'id': 'nonUserMarkers',
        'type': 'circle',
        'source': 'nonUserMarkers',
        'paint': {
          'circle-radius': 10,
          'circle-color': '#9575cd'
        }
        
      })


      map.addControl(new mapboxgl.Geocoder({ position: 'top-left' }))

    }) 

    map.on('click', function (e) {
        let userFeatures = map.queryRenderedFeatures(e.point, { layers: [ 'userMarkers' ] })

        if (!userFeatures.length) {
            return
        } else {
          map.flyTo({ center: userFeatures[0].geometry.coordinates })
        }

        let userfeature = userFeatures[0]

        let popup = new mapboxgl.Popup()
            .setLngLat(userfeature.geometry.coordinates)
            .setHTML(`
              ${userfeature.properties.title} <br />
              ${userfeature.properties.description} <br />
              Contact ${userfeature.properties.contact} to volunteer<br />
            `)
            .addTo(map)
    })

    map.on('click', function (e) {
        let nonUserFeatures = map.queryRenderedFeatures(e.point, { layers: [ 'nonUserMarkers' ] })

        if (!nonUserFeatures.length) {
            return
        } else {
          map.flyTo({ center: nonUserFeatures[0].geometry.coordinates })
        }

        let nonuserfeature = nonUserFeatures[0]

        let popup = new mapboxgl.Popup()
            .setLngLat(nonuserfeature.geometry.coordinates)
            .setHTML(`
              ${nonuserfeature.properties.title} <br />
              ${nonuserfeature.properties.description} <br />
              Contact ${nonuserfeature.properties.contact} to volunteer</a>
            `)
            .addTo(map)
    })

    map.on('mousemove', function (e) {
        let userfeatures = map.queryRenderedFeatures(e.point, { layers: [ 'userMarkers' ] })
        map.getCanvas().style.cursor = (userfeatures.length) ? 'pointer' : ''
        let nonuserfeatures = map.queryRenderedFeatures(e.point, { layers: [ 'nonUserMarkers' ] })
        map.getCanvas().style.cursor = (nonuserfeatures.length) ? 'pointer' : ''
    })
  }

  getCoordinates(e) {
    e.preventDefault()
    let address = this.refs.coord.value
    $.ajax({
      url: '/api/mapbox?address=' + this.refs.coord.value,
      type: 'GET'
     }).done( response => {
      this.addRequest(this.props.auth.id, address, response.features[0].center)
    })
  }

  getRequests() {
    $.ajax({
      url: '/api/requests',
      type: 'GET'
    }).done( requests => {
      this.setState({ requests: requests })
      this.loadMap()
    })
  }

  deleteRequest(id) {
     $.ajax({
       url: '/api/requests/' + id,
       type: 'DELETE',
       dataType: 'JSON',
       contentType: 'application/json',
       data: JSON.stringify({ id })
     }).done( request => {
       this.getRequests()
     }).fail( err => {
     })
  }

  addRequest(id, address, coords) {
    $.ajax({
      url: '/api/requests',
      type: 'POST',
      dataType: 'JSON',
      contentType: 'application/json',
      data: JSON.stringify({ 
        text: this.refs.text.value, 
        desc: this.refs.desc.value,
        coord: coords,
        id: id,
        address: address,
        info: this.refs.info.value 
      })
    }).done( request => {
      this.setState({ requests: [ ...this.state.requests, request ] })
      this.props.dispatch(addRequests(request))
      this.refs.text.value = ''
      this.refs.desc.value = ''
      this.refs.coord.value = ''
      this.refs.info.value = '' 
      this.loadMap()
    })
  }
  

  render() {
    const token = this.props.auth.token
    const id = this.props.auth.id
    let requests = this.state.requests.map( request => {
      return(
        <CollapsibleItem key={request._id} header={request.properties.title} icon="place">
          Description: {request.properties.description} 
          <br />
          Address: {request.properties.address}
          <br />
          Contact: {request.properties.info}
          <br />
          {(id === request.properties.userId) ? (<button className="btn" onClick={() => this.deleteRequest(request._id)}>Delete</button>) : f => f}
          
        </CollapsibleItem>
      )
    })

  return (
    <div className="row" id={ big }>
      <div style={{ width: 660, height: 400 }} className="col s12 m6">
        <ResponsiveEmbed a16by9>
          <div id="map" className={mapThing}></div>
        </ResponsiveEmbed>
      </div>
      <div className="col s12 m6 center">
        <div style={{ height: '250px' }}>
          <h2 id="add" className="btn">Add a Volunteer Event</h2>
          <form id="addForm" className={hideDiv} style={{ display: 'none' }} onSubmit={(e) => this.getCoordinates(e)}>
            <input type="text" ref="text" placeholder="Volunteer Event Title" />
            <input type="text" ref="desc" placeholder="Description of Event" />
            <input type="text" ref="coord" placeholder="Location of Event" />
            <input type="text" ref="info" placeholder="Contact Email or Phone Number" />
            <button className="btn"type="submit">Add</button>
          </form>
        </div>
        <br />
        <h4 className="btn" id="serve">Service Opportunities</h4>
        <div id="list" className={hideDiv} style={{ display: 'none' }}>
          <input type="text" ref="search" />
          <Collapsible popout>
            {requests}
          </Collapsible>
        </div>
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

