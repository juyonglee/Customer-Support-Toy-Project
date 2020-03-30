var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.user && req.session.otp){
    res.render('index', { title: req.user.name });
  } else if(req.user) {
    res.render('otp')
  } else {
    res.redirect("auth/login")
  }
});

module.exports = router;
