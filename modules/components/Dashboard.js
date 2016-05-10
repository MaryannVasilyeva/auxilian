import React from 'react'
import $ from 'jquery'
import { connect } from 'react-redux'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.addTodo = this.addTodo.bind(this)
    this.state = { todos: [] }
  }

  componentDidMount() {
    let mapboxgl = window.mapboxgl
    mapboxgl.accessToken = 'pk.eyJ1IjoibXZhc2lseWV2YSIsImEiOiJjaW51dnV3eDUxMm5jdWdseXR3dW1wazRoIn0.l7HVScO-ipfCEwOmvDuGsg'
    let map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v8", //stylesheet location
      center: [ -74.50, 40 ], // starting position
      zoom: 9 // starting zoom
    })   
  }

  componentWillMount() {
    const id = this.props.auth.id
    $.ajax({
      url: '/api/todos',
      type: 'GET',
      dataType: 'JSON',
      contentType: 'application/json',
      data: { id: id }
    }).done( todos => {
      this.setState({ todos: todos })
    })
  }

  addTodo(e, id) {
    e.preventDefault()
    $.ajax({
      url: '/api/todos',
      type: 'POST',
      dataType: 'JSON',
      contentType: 'application/json',
      data: JSON.stringify({ text: this.refs.text.value, id: id })
    }).done( todo => {
      this.setState({ todos: [ ...this.state.todos, todo ] })
    })
    this.refs.text.value = ''
  }

  render() {
    const token = this.props.auth.token
    const id = this.props.auth.id
    let todos = this.state.todos.map( todo => {
      return <li key={todo._id}>{todo.text}</li>
    })

  return (
    <div>
      <h1>Dashboard</h1>
      <div id='map' style={{ position: "absolute", top: "0", bottom: "0", width: "100%" }}></div>
      <form onSubmit={(e) => this.addTodo(e, id)}>
        <input ref="text" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos}
      </ul>
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
