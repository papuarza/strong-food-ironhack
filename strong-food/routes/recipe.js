const express = require('express');
const router  = express.Router();
const passport = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/create', ensureLoggedOut(), (req, res) => {
    res.render('recipe/create');
});

router.get('/get-recipes', (req, res) => {
    res.render('recipe/get');
});

router.post('/get-recipes', (req, res) => {
    console.log(req.body)
});


// router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
//   successRedirect : '/',
//   failureRedirect : '/login'
// }));
//
// router.get('/signup', ensureLoggedOut(), (req, res) => {
//     res.render('user/signup');
// });
//
// router.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
//   successRedirect : '/',
//   failureRedirect : '/signup'
// }));
//
// router.post('/logout', ensureLoggedIn(), (req, res) => {
//     req.logout();
//     res.redirect('/');
// });

module.exports = router;
