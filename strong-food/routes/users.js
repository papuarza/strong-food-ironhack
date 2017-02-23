const express = require('express');
const router  = express.Router();
const passport = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const User = require('../models/user');
const Recipe = require('../models/recipes');
const Relation = require('../models/relationSchema');

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
    const recipesSaved = [];
    const recipesCooked = [];
    Relation.find({
        user: req.user._id
    }, (err, relation) => {
        if (err) {
            return next(err);
        }
        relation.forEach(function(elem, indexOf, arr) {
            elem.populate('recipe', (err, recipes) => {
                if (err) {
                    return next(err);
                }
                if (indexOf < arr.length - 1) {
                    if(recipes.recipe.cooked){
                      recipesCooked.push(recipes.recipe)
                    } else {
                      recipesSaved.push(recipes.recipe)
                    }
                } else {
                  if(recipes.recipe.cooked){
                    recipesCooked.push(recipes.recipe)
                  } else {
                    recipesSaved.push(recipes.recipe)
                  }
                  console.log(recipesSaved)
                    res.render('user/profile', {
                        user: user,
                        recipesSaved: recipesSaved,
                        recipesCooked: recipesCooked
                    });
                }
            });
        });
    });

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
  username = req.body.username;
  email = req.body.email;
  birthday = req.body.birthday;
  heigth = req.body.heigth;
  weight = req.body.weight;
  genere = req.body.genere;
  user = {
    username : username,
    email : email,
    birthday : birthday,
    heigth : heigth,
    weight : weight,
    genere : genere
  }
  console.log(user)

  User.update({_id: userId}, {$set: {user}}, (err, product) => {
  if (err){ return next(err); }
  console.log("////////////////////////////////////////////////////// EDITADO: "+product)
  return res.redirect('/profile');
});
});

router.get('/wod', (req, res) => {
  res.render('user/wod')
});





module.exports = router;
