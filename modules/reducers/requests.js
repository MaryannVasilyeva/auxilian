const requests = (state = [], action) => {
  switch(action.type) {
    case 'GET_REQUESTS':
      return action.requests || []
    case 'ADD_REQUESTS':
      return [
        ...state,
        {
          id: action.id, 
          title: action.title, 
          description: action.description,
          address: action.address,
          contact: action.contact
        }
      ]
    case 'SEARCH_REQUESTS':
      let term = action.search.charAt(0) ==='@' ? action.search.substring(1) : action.search
      let pattern = new RegExp(term)
      let requests = []
      if (action.search.charAt(0) === '@') {
        state.map( request => {
          if (pattern.test(request.address))
            requests.push({ ...request })
        })
      } else {
        state.map( request => {
        if (pattern.test(request.request))
            requests.push({ ...request })
        })
      }
      return requests.length ? requests : state
    default:
      return state
  }
}

export default requests
