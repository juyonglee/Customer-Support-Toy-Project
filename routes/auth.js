var express = require('express');
var router = express.Router();
const passport = require('passport');

router.post('/login', passport.authenticate('local', { failureRedirect: '/users'}), function(req, res) {
    res.redirect('/')
});

router.post('/logout', function(req, res) {
    req.logout();
    res.redirect('/')
});

module.exports = router;
