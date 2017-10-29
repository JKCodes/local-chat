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

  },

  post: function(params) {

  },

  put: function(id, params) {

  }

}