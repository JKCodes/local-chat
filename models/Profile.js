var mongoose = require('mongoose')

var ProfileSchema = new mongoose.Schema({
  firstName: {type:String, trim:true, lowercase:true, required:true, default: ''},
  lastName: {type:String, trim:true, lowercase:true, required:true, default: ''},
  email: {type:String, trim:true, lowercase:true, required:true, default: ''},
  password: {type:String, required:true, default: ''},
  timestamp: {type:Date, default:Date.now}
})

ProfileSchema.methods.summary = function() {
  var summary = {
    id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email
  }

  return summary
}

module.exports = mongoose.model('ProfileSchema', ProfileSchema)