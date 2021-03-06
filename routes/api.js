var express = require('express')
var router = express.Router()
var controllers = require('../controllers')

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

  controller.get(null, false)
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

router.delete('/:resource/:id', function(req, res, next) {
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

  controller.delete(id)
  .then(function(result) {
    res.json({
      confirmation: 'success',
      message: "Requested resource deleted successfully"
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