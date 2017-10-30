var mongoose = require('mongoose')

var PlaceSchema = new mongoose.Schema({
  name: {type:String, required:true, default: ''},
  description: {type:String, default: ''},
  type: {type:String, default: ''},
  address: {type:String, required:true, default: ''},
  city: {type:String, required:true, default: ''},
  state: {type:String, required:true, default: ''},
  zip: {type:String, required:true, default: ''},
  geo: {
    type: [Number],
    index: '2d'
  },
  timestamp: {type:Date, default:Date.now}
})

module.exports = mongoose.model('PlaceSchema', PlaceSchema)