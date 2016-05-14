import mongoose from 'mongoose'

let Schema = mongoose.Schema

let Request = new Schema({
  geometry: { 
    type: { type: String, default: "Point" }, 
    coordinates: [ String ] 
  },
  properties: {
    title:       { type: String, required: true },
    description: { type: String, required: true },
    date:        { type: Date, default: new Date() },
    userId:      String
  }
})

module.exports = mongoose.model('Request', Request)
