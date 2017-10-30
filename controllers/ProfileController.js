var Profile = require('../models/Profile')
var Promise = require('bluebird')

module.exports = {

  get: function(params) {
    return new Promise(function(resolve, reject) {
      Profile.find(params, function(err, profiles) {
        if (err) {
          reject(err)
          return
        }

        resolve(profiles)
      })
    })
  },

  getById: function(id) {
    return new Promise(function(resolve, reject) {
      Profile.findById(id, function(err, result) {
        if (err) {
          reject(err)
          return
        }

        resolve(result)
      })
    })
  },

  post: function(params) {
    return new Promise(function(resolve, reject) {
      Profile.create(params, function(err, result) {
        if (err) {
          reject(err)
          return
        }

        resolve(result)
      })
    })
  },

  put: function(id, params) {
    return new Promise(function(resolve, reject) {
      Profile.findByIdAndUpdate(id, req.body, {new:true}, function(err, result) {
        if (err) {
          reject(err)
          return
        }

        resolve(result)
      })
    })
  }

}