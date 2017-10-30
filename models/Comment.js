var mongoose = require('mongoose')

var CommentSchema = new mongoose.Schema({
  profile: {type:String, required:true, default:''},
  text: {type:String, trim:true, required:true, default:''},
  timestamp: {type:Date, default:Date.now}
})

module.exports = mongoose.model('CommentSchema', CommentSchema)