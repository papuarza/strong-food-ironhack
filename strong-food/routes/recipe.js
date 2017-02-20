const express = require('express');
const router  = express.Router();
const passport = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const Recipe = require('../models/recipes')

router.get('/create', ensureLoggedOut(), (req, res) => {
    res.render('recipe/create');
});

router.get('/get-recipes', (req, res) => {
    res.render('recipe/get');
});

router.post('/get-recipes', (req, res) => {
  const body = req.body.recipes;
  console.log("hola")
  body.forEach(function(elem){
    console.log(elem)
    const recipe = new Recipe(elem)
    recipe.save(function (err, doc) {
      if (err) return next(err);
      console.log(doc);
    });
  });

});


module.exports = router;
