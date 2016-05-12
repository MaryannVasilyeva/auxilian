import Request from '../models/request'
//change this from the todos to the requests
export const createRequest = (req, res) => {
  new Request({
    text: req.body.text,
    userId: req.body.id,
    completed: false
  }).save( function (err, request) {
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
