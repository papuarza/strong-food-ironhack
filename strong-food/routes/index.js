/*jshint esversion: 6*/
var express = require('express');
var router = express.Router();
const Recipe = require('../models/recipes');


/* GET home page. */
router.get('/', (req, res, next) => {
  Recipe.find({},function(err,arr){
    if (err) return next(err);
    res.render('index', {arr});

  });
});


module.exports = router;
