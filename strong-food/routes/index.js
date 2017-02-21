/*jshint esversion: 6*/
var express = require('express');
var router = express.Router();
const Recipe = require('../models/recipes');


/* GET home page. */
router.get('/', (req, res, next) => {
  user = req.user;
    res.render('index', {user});
});


module.exports = router;
