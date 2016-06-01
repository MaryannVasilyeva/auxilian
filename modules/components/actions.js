import $ from 'jquery'

export const login = (email, pass, redirect, history) => {
  return (dispatch) => {
    $.ajax({
      url: '/api/signin',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ email: email, password: pass })
    }).done( res => {
      const token = getToken()
      sessionStorage.token = token
      sessionStorage.userId = res.id
      dispatch(loggedIn(res.id, token))
      history.push(redirect)
    }).fail( res => {
      sessionStorage.clear()
      dispatch(logout())
    })
  }
}

export const signUp = (email, pass, redirect, history) => {
  return (dispatch) => {
    $.ajax({
      url: '/api/signup',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ email: email, password: pass })
    }).done( res => {
      const token = getToken()
      sessionStorage.token = token
      sessionStorage.userId = res.id
      dispatch(loggedIn(res.id, token))
      history.push(redirect)
    }).fail( res => {
      sessionStorage.clear()
      dispatch(logout())
    })
  }
}

const getToken = () => {
  return Math.random().toString(36).substring(7)
}

export const logout = () => {
  return {
    type: 'USER_LOGGED_OUT'
  }
}

export const loggedIn = (id, token) => {
  return {
    type: 'USER_LOGGED_IN',
    id,
    token
  }
}

export const addRequests = (text) => {
  return (dispatch) => {
    fetch('/api/requests',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text })
      }
    )
    .then( res => res.json())
    .then( json => dispatch(request('ADD_REQUEST', json)))
  }
}

export const fetchRequests = () => {
  return (dispatch) => {
    fetch('/api/requests')
    .then( res => res.json())
    .then( json => dispatch(getRequests(json)))
  }
}

export const searchRequests = (search) => {
  return {
    type: 'SEARCH_REQUESTS',
    search
  }
}

const getRequests = (requests) => {
  return {
    type: 'GET_REQUESTS',
    requests
  }
}

const request = (type, item) => {
  return {
    type: type,
    id: item._id,
    title: item.properties.title,
    description: item.properties.description,
    address: item.properties.description,
    contact: item.properties.contact
    
  }
}

