import mongoose from 'mongoose'
let Schema = mongoose.Schema

let Todo = new Schema({
  text : String,
  userId : String,
  completed : Boolean
})

module.exports = mongoose.model('Todo', Todo)
