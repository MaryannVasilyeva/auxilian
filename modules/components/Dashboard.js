import React from 'react'
import $ from 'jquery'
import { connect } from 'react-redux'
import Map from './Map'
import { mapThing } from '../styles.css'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.addRequest = this.addRequest.bind(this)
    this.state = { requests: [] }
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
     })
     this.refs.text.value = ''
     this.refs.desc.value = ''
     this.refs.coord.value = '' 

  }

  render() {
    const token = this.props.auth.token
    const id = this.props.auth.id
    let requests = this.state.requests.map( request => {
      return(<li key={request._id}>{`
        ${request.properties.title} : 
        ${request.properties.description} : 
        ${request.geometry.coordinates} :
        ${request.properties.userId}
      `}</li>)
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
        <ul style={{ float: "right" }}>
          {requests}
        </ul>
      </div>
      <Map />
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
