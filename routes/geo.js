var express = require('express')
var router = express.Router()
var superagent = require('superagent')

router.get('/', function(req, res, next) {

  var address = req.query.address

  var url = "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyCAwPpxBVTQgFgmOQ0alCy1WitDxsNpdtQ"

  superagent
  .get(url)
  .query(null)
  .set('Accept', 'text/json')
  .end(function(err, response) {
    if (err) {
      res.json({
        confirmation: 'fail',
        message: err
      })

      return
    }

    var locationInfo = response.body.results[0]
    var geometry = locationInfo.geometry
    var latLng = geometry.location

    res.send(latLng)
  })
})

module.exports = router