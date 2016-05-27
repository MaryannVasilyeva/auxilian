import '../modules/styles.css'
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { ServerRoute } from 'react-project'
import App from './components/App'
import Carousel from './components/Carousel'
import NoMatch from './components/NoMatch'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import About from './components/About'
import { signUp, signIn } from './api/auth'
import { getMapBox } from './api/requests'
import { createRequest, getRequests, deleteRequest } from './api/requests'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { push } from 'react-router-redux'

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.auth,
  predicate: auth => auth.isAuthenticated,
  redirectAction: push,
  wrapperDisplayName: 'UserIsAuthenticated'
})

export default (
  <Route>
    <Route path="/" component={App}>
      <IndexRoute component={Carousel} />
      <Route path="login" component={Login} />
      <Route path="about" component={About} />
      <Route path="dashboard" component={UserIsAuthenticated(Dashboard)} />
    </Route>
    <ServerRoute path="/api">
      <ServerRoute path="signup" post={signUp} />
      <ServerRoute path="signin" post={signIn} />
      <ServerRoute path="mapbox" get={getMapBox} />
      <ServerRoute path="requests" post={createRequest} get={getRequests}>
        <ServerRoute path=":id" delete={deleteRequest} /> 
      </ServerRoute>
    </ServerRoute>
    <Route path="*" status={404} component={NoMatch}/>
  </Route>
)

