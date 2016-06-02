import React from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'
import { fetchRequests, searchRequests } from './actions'
import { blueText, list } from '../styles.css'
import { Collapsible, CollapsibleItem } from 'react-materialize'

const mapStateToProps = (state) => {
  return { requests: state.requests, id: state.auth.id }
}

class List extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.dispatch(fetchRequests())
  }

  search() {
    this.props.dispatch(searchRequests(this.refs.search.value))
  }

  deleteRequest(id) {
     $.ajax({
       url: '/api/requests/' + id,
       type: 'DELETE',
       dataType: 'JSON',
       contentType: 'application/json',
       data: JSON.stringify({ id })
     }).done(request => {
       this.props.dispatch(fetchRequests())
       this.props.loadMap()
     })
   }

  render() {
    const id = this.props.id
    let requests = this.props.requests.map( request => {
      return(
        <CollapsibleItem key={request._id} header={request.properties.title}>
          Description: {request.properties.description} 
          <br />
          Address: {request.properties.address}
          <br />
          Contact: {request.properties.info}
          <br />
          {(id === request.properties.userId) ? (<button className="btn right" onClick={() => this.deleteRequest(request._id)}>Delete</button>) : f => f}
          
        </CollapsibleItem>
      )
    })
    return(
      <div id={list} className="col m6 s12">
        <h2 className="center" id={blueText}>Service Opportunities</h2>
          <div>
            <input onChange={this.search.bind(this)} type="text" placeholder="Search" ref="search" />
            <Collapsible popout>
              {requests}
            </Collapsible>
          </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(List)
