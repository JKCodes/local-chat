var Place = require('../models/Place')
var Promise = require('bluebird')

module.exports = {

  get: function(params) {
    return new Promise(function(resolve, reject) {
      Place.find(params, function(err, places) {
        if (err) {
          reject(err)
          return
        }

        resolve(places)
      })
    })
  },

  getById: function(id) {
    return new Promise(function(resolve, reject) {
      Place.findById(id, function(err, place) {
      if (err) {
        reject(err)
          return
        }

        resolve(place)
      })
    })
  },

  post: function(params) {
    return new Promise(function(resolve, reject) {
      Place.create(params, function(err, place) {
        if (err) {
          reject(err)
          return
        }

        resolve(place)
      })
    })
  },

  put: function(id, params) {
    return new Promise(function(resolve, reject) {
      Place.findByIdAndUpdate(id, params, {new:true}, function(err, place) {
        if (err) {
          reject(err)
          return
        }

        resolve(place)
      })
    })
  }

}