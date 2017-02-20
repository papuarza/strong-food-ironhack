const express = require('express');
const router  = express.Router();
const passport = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('user/login');
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect : 'user/profile',
  failureRedirect : '/login'
}));

router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('user/signup');
});

router.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
  successRedirect : 'user/profile',
  failureRedirect : '/signup'
}));

router.post('/logout', ensureLoggedIn(), (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/profile', ensureLoggedOut(), (req, res) => {
    res.render('user/profile');
});

module.exports = router;
