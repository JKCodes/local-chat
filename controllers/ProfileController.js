var Profile = require('../models/Profile')
var Promise = require('bluebird')
var bcrypt = require('bcrypt')

module.exports = {

  get: function(params, isRaw) {
    return new Promise(function(resolve, reject) {
      Profile.find(params, function(err, profiles) {
        if (err) {
          reject(err)
          return
        }

        if (isRaw == true) {
          resolve(profiles)
          return
        }

        var list = []
        for (var i=0;i<profiles.length;i++)
          list.push(profiles[i].summary())

        resolve(list)
      })
    })
  },

  getById: function(id) {
    return new Promise(function(resolve, reject) {
      Profile.findById(id, function(err, profile) {
        if (err) {
          reject(err)
          return
        }

        resolve(profile.summary())
      })
    })
  },

  post: function(params) {
    return new Promise(function(resolve, reject) {
      var password = params.password
      params['password'] = bcrypt.hashSync(password, 10)
      
      Profile.create(params, function(err, profile) {
        if (err) {
          reject(err)
          return
        }

        resolve(profile.summary())
      })
    })
  },

  put: function(id, params) {
    return new Promise(function(resolve, reject) {
      Profile.findByIdAndUpdate(id, params, {new:true}, function(err, profile) {
        if (err) {
          reject(err)
          return
        }

        resolve(profile.summary())
      })
    })
  },

  delete: function(id) {
    return new Promise(function(resolve, reject) {
      Profile.findByIdAndRemove(id, function(err, profile) {
        if (err) {
          reject(err)
          return
        }

        resolve(profile.summary())
      })
    })
  }

}