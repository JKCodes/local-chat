var express = require('express');
var router = express.Router();
var ProfileController = require('../controllers/ProfileController')
var bcrypt = require('bcrypt')

router.get('/:action', function(req, res, next) {
  var action = req.params.action
  
  if (action == 'currentuser') {
    if (!req.session || !req.session.user) {
      res.json({
        confirmation: 'fail',
        mssage: 'User not logged in'
      })

      return
    }

    var userId = req.session.user

    res.json({
      confirmation: 'fail',
      user: userId
    })

  }
})

router.post('/:action', function(req, res, next) {
  var action = req.params.action

  if (action == 'login') {
    var email = req.body.email

    ProfileController.get({email:email}, true)
    .then(function(profiles) {
      if (profiles.length == 0) {
        res.json({
          confirmation: 'fail',
          message: 'Profile not found.'
        })

        return
      }

      var profile = profiles[0]
      var password = req.body.password
      var passwordCorrect = bcrypt.compareSync(password, profile.password)

      if (passwordCorrect == false) {
        res.json({
          confirmation: 'fail',
          message: 'Incorrect Password.'
        })

        return
      }

      req.session.user = profile._id

      res.json({
        confirmation: 'success',
        profile: profile.summary()
      })
    })
    .catch(function(err) {
      res.json({
        confirmation: 'fail',
        message: err
      })

      return
    })
  }
})

module.exports = router;
