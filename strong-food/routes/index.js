/*jshint esversion: 6*/
const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipes');


/* GET home page. */
router.get('/', (req, res, next) => {
    user = req.user;
    res.render('index', {
        user
    });
});


module.exports = router;
