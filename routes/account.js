var express = require('express');
var router = express.Router();
var ProfileController = require('../controllers/ProfileController')
var bcrypt = require('bcrypt')

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

      res.json({
        confirmation: 'success',
        profile: profile.summary()
      })
    })
    .catch()
  }
})

module.exports = router;
