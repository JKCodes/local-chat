var express = require('express')
var router = express.Router()
var Profile = require('../models/Profile')

router.get('/:resource', function(req, res, next) {
  var resource = req.params.resource

  if (resource == 'profile') {
    Profile.find(null, function(err, results) {
      if (err) {
        res.json({
          confirmation: 'fail',
          message: err
        })

        return
      }

      res.json({
        confirmation: 'success',
        results: results
      })

      return
    })
  }
})

module.exports = router