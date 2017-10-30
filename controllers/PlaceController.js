var Place = require('../models/Place')
var Promise = require('bluebird')
var superagent = require('superagent')

module.exports = {

  get: function(params, isRaw) {
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

      // address format = 100+west+33rd+street,+new+york,ny
      var address = params.address + ',' +params.city + ',' + params.state
      address = address.replace(' ', '+')

      var url = "https://maps.googleapis.com/maps/api/geocode/json"

      var geoParams = {
        address: address,
        key: 'AIzaSyCAwPpxBVTQgFgmOQ0alCy1WitDxsNpdtQ'
      }

      superagent
      .get(url)
      .query(geoParams)
      .set('Accept', 'text/json')
      .end(function(err, response) {
        if (err.status > 400) {
          reject(err)

          return
        }

        reject(response)

        return
        
        var locationInfo = response.body.results[0]
        var geometry = locationInfo.geometry
        var latLng = geometry.location

        params['geo'] = [latLng.lat, latLng.lng]

        Place.create(params, function(err, place) {
          if (err) {
            reject(err)
            return
          }

          resolve(place)
        })
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
  },

  delete: function(id) {
    return new Promise(function(resolve, reject) {
      Place.findByIdAndRemove(id, function(err, place) {
        if (err) {
          reject(err)
          return
        }

        resolve(place)
      })
    })
  }

}