import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'
import auth from './auth'
import requests from './requests'

const rootReducer = combineReducers({
  routing: routeReducer,
  auth,
  requests
})

export default rootReducer
