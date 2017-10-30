var Place = require('../models/Comment')
var Promise = require('bluebird')

module.exports = {

  get: function(params){
    return new Promise(function(resolve, reject){
      Place.find(params, function(err, comments){
        if (err){
          reject(err)
          return
        }

        resolve(comments)
      })
    })
  },

  getById: function(id){
    return new Promise(function(resolve, reject){
      Place.findById(id, function(err, comment){
        if (err){
          reject(err)
          return
        }

        resolve(comment)
      })
    })
  },

  post: function(params){
    return new Promise(function(resolve, reject){
      Comment.create(params, function(err, comment){
        if (err){
          reject(err)
          return
        }

        resolve(comment)
      })
    })
  },

  put: function(id, params){
    return new Promise(function(resolve, reject){
      Comment.findByIdAndUpdate(id, params, {new:true}, function(err, comment){
        if (err){
          reject(err)
          return
        }

        resolve(comment)
      })
    })

  },

  delete: function(id) {
    return new Promise(function(resolve, reject) {
      Comment.findByIdAndRemove(id, function(err, comment) {
        if (err) {
          reject(err)
          return
        }

        resolve(comment)
      })
    })
  }

}