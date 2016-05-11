import React from 'react'
import $ from 'jquery'
import { connect } from 'react-redux'
import Map from './Map'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.addTodo = this.addTodo.bind(this)
    this.state = { todos: [] }
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
      <div>
        <h1>Dashboard</h1>
      </div>
      <div>
        <form onSubmit={(e) => this.addTodo(e, id)}>
          <input ref="text" />
          <button type="submit">Add</button>
        </form>
        <ul>
          {todos}
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
