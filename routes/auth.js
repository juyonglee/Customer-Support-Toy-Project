var express = require('express');
var router = express.Router();
const passport = require('passport');

router.post('/login', passport.authenticate('local', { failureRedirect: '/auth/login'}), function(req, res) {
    req.session.otp = false;
    res.redirect('/otp')
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/')
});

router.get('/login', function(req, res) {
    res.render('login', { title: 'No Session!' });
});

module.exports = router;
