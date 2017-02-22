/*jshint esversion: 6*/
const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
    ensureLoggedIn,
    ensureLoggedOut
} = require('connect-ensure-login');
const Recipe = require('../models/recipes');
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
        // console.log(recipes)
        res.render('recipe/show', {
            recipes
        });
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


router.get('/recipes/:id', (req, res) => {
    const id = req.params.id;
    Recipe.findOne({
        _id: id
    }, function(err, recipe) {
        if (err) return next(err);
        res.render('recipe/show-one', {
            recipe
        });
    });
});


module.exports = router;
