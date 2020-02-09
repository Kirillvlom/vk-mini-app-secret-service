const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NoteSchema = new Schema({
  comment: {
    type: String
  },
  description: {
    type: String
  },
  password: {
    type: String
  }, 
  uniqUrl: {
    type: String
  },
  userId: {
    type: Number
  }
})


const NoteModel = mongoose.model('notes', NoteSchema)
module.exports = NoteModel