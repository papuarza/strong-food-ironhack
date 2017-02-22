const express = require('express');
const router  = express.Router();
const passport = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const User = require('../models/user')

var multer  = require('multer');
var upload = multer({ dest: './public/uploads/' });


router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('user/login');
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login'), function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/profile');
});

router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('user/signup');
});

router.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
  successRedirect : '/profile',
  failureRedirect : '/signup'
}));

router.post('/logout', ensureLoggedIn(), (req, res) => {
    req.logout();
    res.redirect('/');
});


router.post('/upload', ensureLoggedIn(), upload.single('profilePic'), (req, res) => {
    imgUrl = "uploads/"+req.file.filename;
    userId = req.user._id;
    User.findByIdAndUpdate(userId, {imgUrl}, (err, product) => {
    if (err){ return next(err); }
    console.log("editado")
    return res.redirect('/profile');
  });

});


router.get('/profile', ensureLoggedIn(), (req, res) => {
    user = req.user;
    console.log(user)
    res.render('user/profile', {user});
});

router.get('/edit/:id', ensureLoggedIn(), (req, res) => {
  const id = req.params.id
  User.findOne({_id: id}, function (err, user) {
  if (err) return next(err)
  console.log(user)
  res.render('user/edit', {user})
})
});

router.post('/edit/:id', (req, res, next) => {

  userId = req.user._id;
  body = req.body;
  console.log(body);
  // User.findByIdAndUpdate(userId, {imgUrl}, (err, product) => {
  // if (err){ return next(err); }
  // console.log("editado")
  return res.redirect('/profile');
// });
});

router.get('/wod', (req, res) => {
  res.render('user/wod')
});

  const id = req.params.id
  const body = req.body
  const {username, email, birthday, height, weigth, genere} = body

  const criteria = {_id: id}
  const update = {$set: {username, email, birthday, height, weigth, genere}}

  User.updateOne(criteria, update, function (err, user) {
    if (err) return next(err)
    user = req.user;
    console.log(user)
    res.render('user/profile', {user});
  })
});




module.exports = router;
