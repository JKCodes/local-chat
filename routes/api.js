var express = require('express')
var router = express.Router()
var Profile = require('../models/Profile')
var ProfileController = require('../controllers/ProfileController')
var Place = require('../models/Place')
var PlaceController = require('../controllers/PlaceController')
var controllers = {
  profile: ProfileController,
  place: PlaceController
}

router.get('/:resource', function(req, res, next) {
  var resource = req.params.resource
  var controller = controllers[resource]

  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: 'Invalid Resource.'
    })

    return
  }

  controller.get(null)
  .then(function(results) {
    res.json({
      confirmation: 'success',
      results: results
    })

    return
  })
  .catch(function(err) {
    res.json({
      confirmation: 'fail',
      message: err
    })

    return
  })
})

router.get('/:resource/:id', function(req, res, next) {
  var resource = req.params.resource
  var id = req.params.id
  var controller = controllers[resource]

  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: 'Invalid Resource.'
    })

    return
  }

  controller.getById(id)
  .then(function(results) {
    res.json({
      confirmation: 'success',
      results: results
    })

    return
  })
  .catch(function(err) {
    res.json({
      confirmation: 'fail',
      message: 'Not found'
    })

    return
  })
})

router.post('/:resource', function(req, res, next) {
  var resource = req.params.resource
  var controller = controllers[resource]

  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: 'Invalid Resource.'
    })

    return
  }

  controller.post(req.body)
  .then(function(result) {
    res.json({
      confirmation: 'success',
      result: result
    })

    return
  })
  .catch(function(err) {
    res.json({
      confirmation: 'fail',
      message: err
    })

    return
  })
})

router.put('/:resource/:id', function(req, res, next) {
  var resource = req.params.resource
  var id = req.params.id
  var controller = controllers[resource]

  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: 'Invalid Resource.'
    })

    return
  }

  controller.put(id, req.body)
  .then(function(result) {
    res.json({
      confirmation: 'success',
      result: result
    })

    return
  })
  .catch(function(err) {
    res.json({
      confirmation: 'fail',
      message: 'Not found'
    })

    return
  })
})

module.exports = router