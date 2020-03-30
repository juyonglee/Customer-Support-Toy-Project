var express = require('express');
var router = express.Router();
const passport = require('passport');
const OTP = require("otp");

router.post('/login', passport.authenticate('local', { failureRedirect: '/auth/login'}), function(req, res) {
    req.session.otp = false;
    res.redirect('/auth/otp')
});

router.get('/logout', function(req, res) {
    req.logout();
    req.session.destroy();
    res.redirect('/')
});

router.get('/login', function(req, res) {
    res.render('login', { title: 'No Session!' });
});

router.get('/otp', function (req, res) {
    if(req.user) {
        res.render('otp', {})
    } else {
        res.redirect('/auth/login')
    }
});

router.post('/otpVerification', function (req, res) {
    if(req.user) {
        var otp = OTP({
            name: req.user.name,
            secret: "juyongleenshcnet"
        });
        console.log(otp.secret);
        console.log(otp.totpURL);
        console.log(otp.totp());
        // res.end(otp.totp())
        const otpInputs = [req.body.digit1, req.body.digit2, req.body.digit3, req.body.digit4, req.body.digit5, req.body.digit6];
        var otpStr = "";
        for (let i = 0; i < otpInputs.length; i++) {
            otpStr += otpInputs[i]
        }
        console.log(otpStr);
        if(otp.totp() == otpStr) {
            req.session.otp = true;
            res.redirect('/')
        } else {
            res.redirect('/auth/otp')
        }
    } else {
        res.redirect('/auth/login')
    }

});

module.exports = router;
