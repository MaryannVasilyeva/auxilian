import React from 'react'
import { createServer } from 'react-project/server'
import { RouterContext } from 'react-router'
import Document from '../modules/components/Document'
import routes from '../modules/routes'

import mongoose from 'mongoose'
import passport from 'passport'
import local from 'passport-local'
import session from 'express-session'
import User from './models/user'
import geocoder from 'geocoder'
let LocalStrategy = local.Strategy

function getApp(req, res, requestCallback) {
  // here is your chance to do things like get an auth token and generate
  // your route config w/ request aware `onEnter` hooks, etc.
  requestCallback(null, {
    routes: routes,
    render(routerProps, renderCallback) {
      // here is your chance to load up data before rendering and pass it to
      // your top-level components
      renderCallback(null, {
        renderDocument: (props) => <Document {...props}/>,
        renderApp: (props) => <RouterContext {...props}/>
      })
    }
  })
}

const server = createServer(getApp)

server.use( session({ secret: 'secret', resave: false, saveUnitialized: false }))
server.use(passport.initialize())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

let mongoUri = process.env.MONGODB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/auxilian'

mongoose.connect(mongoUri)

server.start()

