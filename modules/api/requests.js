import Request from '../models/request'
let MapboxClient = require('mapbox')
let client = new MapboxClient('pk.eyJ1IjoibXZhc2lseWV2YSIsImEiOiJjaW51dnZobXIxMm5odWdseWVzanI4d2s1In0.RQNmugJct0lHOOlcFyCeRA')

//change this from the todos to the requests
export const createRequest = (req, res) => {
  //call geocoder get back data
  //get lat and long
  //add to coordinates
  

  new Request({
    geometry: { 
      type: "Point", coordinates: req.body.coord
    },
    properties: {
      title: req.body.text,
      description: req.body.desc,
      date: new Date(),
      userId: req.body.id
    }
  }).save( function (err, request) {
    if (err)
      console.log(err)
    else {
      console.log(request)
    }
    res.json(request)
  })
}

export const getRequests = (req, res) => {
  console.log(`ID: ${req.query.id}`)
  Request.find({ 'properties.userId': req.query.id }, (err, requests) => {
     if (err) 
      console.log(err)
    return res.json(requests)
  })
}

export const getMapBox = (req, res) => {
  if( req.query.address ) {
    client.geocodeForward( req.query.address, (err, response) => {
      if(err) {
        console.log( err )
      }
      else {
        res.json(response)
      }
    })
  }
  else {
    res.json({ response:[] })
  }
}
