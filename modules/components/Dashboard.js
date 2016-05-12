import React from 'react'
import $ from 'jquery'
import { connect } from 'react-redux'
import Map from './Map'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.addRequest = this.addRequest.bind(this)
    this.state = { requests: [] }
  }

  componentWillMount() {
    const id = this.props.auth.id
    $.ajax({
      url: '/api/requests',
      type: 'GET',
      dataType: 'JSON',
      contentType: 'application/json',
      data: { id: id }
    }).done( requests => {
      this.setState({ requests: requests })
    })
  }

  addRequest(e, id) {
    e.preventDefault()
    $.ajax({
      url: '/api/requests',
      type: 'POST',
      dataType: 'JSON',
      contentType: 'application/json',
      data: JSON.stringify({ text: this.refs.text.value, id: id })
    }).done( request => {
      this.setState({ requests: [ ...this.state.requests, request ] })
    })
    this.refs.text.value = ''
  }

  render() {
    const token = this.props.auth.token
    const id = this.props.auth.id
    let requests = this.state.requests.map( request => {
      return <li key={request._id}>{request.text}</li>
    })

  return (
    <div>
      <div>
        <h1>Dashboard</h1>
      </div>
      <div style={{ float: "right" }}>
        <form onSubmit={(e) => this.addRequest(e, id)}>
          <input ref="text" />
          <button type="submit">Add</button>
        </form>
        <ul>
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
