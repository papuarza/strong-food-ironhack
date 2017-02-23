/*jshint esversion: 6*/
const express = require('express');
const router = express.Router();
const passport = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const Recipe = require('../models/recipes')
const Relation = require('../models/relationSchema');

router.get('/create', ensureLoggedOut(), (req, res) => {
    res.render('recipe/create');
});

router.get('/get-recipes', (req, res) => {
    res.render('recipe/get');
});

router.post('/get-recipes', (req, res) => {
    const body = req.body.recipes;
    body.forEach(function(elem) {
        const recipe = new Recipe(elem);
        recipe.save(function(err, doc) {
            if (err) return next(err);
            console.log("guardado");
        });
    });
});


router.get('/show-recipes', (req, res) => {
    Recipe.find({}, function(err, recipes) {
        if (err) return next(err);
        res.render('recipe/show', {
            recipes
        });
    });
});

router.post('/show-recipes', (req, res, next) => {
    console.log(req.body);
    filter = req.body;
    filterKeys = Object.keys(filter);
    filterArr = [];
    filterArr = filterKeys.map(function(elem){
      newObj = {};
      newObj[elem] = true;
      return newObj;
    });
    console.log(filterArr.length)
    console.log(filterArr);
    if(filterArr.length > 0) {
      Recipe.find({ $or: filterArr }, function(err, recipes) {
          if (err) return next(err);
          res.status(200).send({recipes});
      });
    } else {
      Recipe.find({}, function(err, recipes) {
          if (err) return next(err);
          res.status(200).send({recipes});
      });
    }

});

router.post('/save-recipe', (req, res) => {
    const recipe = req.body.recipeId;
    const user = req.user._id;
    const cooked = false;
    const elem = {
        user,
        recipe,
        cooked
    };
    const relation = new Relation(elem);
    relation.save(function(err, doc) {
        if (err) return next(err);
        console.log("guardado");
    });
});

router.post('/save-recipe', (req, res) => {
    const recipe = req.body.recipeId;
    const user = req.user._id;
    const cooked = false;
    const elem = {
        user,
        recipe,
        cooked
    };
    const relation = new Relation(elem);
    relation.save(function(err, doc) {
        if (err) return next(err);
        console.log("guardado");
    });
});

router.get('/recipes/:id', ensureLoggedIn(), (req, res) => {
  const id = req.params.id
  console.log(id)
  Recipe.findOne({_id: id}, function (err, recipe) {
    console.log(recipe)
    if (err) return next(err)
    res.render('recipe/show-one', {recipe})
  })
});


module.exports = router;
