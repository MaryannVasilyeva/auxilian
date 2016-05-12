import mongoose from 'mongoose'
let Schema = mongoose.Schema

let Request = new Schema({
  text : String,
  userId : String,
  completed : Boolean
})

module.exports = mongoose.model('Request', Request)
