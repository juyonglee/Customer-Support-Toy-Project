var express = require('express');
var router = express.Router();
const passport = require('passport');

router.post('/login', passport.authenticate('local', { failureRedirect: '/users', session: false}), function(req, res) {
    res.redirect('/')
});

module.exports = router;
