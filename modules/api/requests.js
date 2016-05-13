import Request from '../models/request'
//change this from the todos to the requests
export const createRequest = (req, res) => {
  //call geocoder get back data
  //get lat and long
  //add to coordinates
  new Request({
    geometry: { 
      type: "Point", coordinates: [ req.body.coord ] 
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
    res.json(request)
  })
}

export const getRequests = (req, res) => {
  let query = Request.find({})
  query.where('userId', req.query.id )
  query.exec( function (err, request) {
    res.json(request)
  })
}
