const express = require('express');
const router = express.Router();
const passport = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
// const Recipe = require('../models/rutines')
const Relation = require('../models/relationSchema');

router.get('/get-rutines', (req, res) => {
    res.render('wod/get');
});

router.post('/get-rutines', (req, res) => {
  // console.log(req.body.rutines[0][0][1])
    exerciseName = req.body.rutines[0][0][0];
    excersieMuscle = req.body.rutines[0][0][1];
    exerciseReps = req.body.rutines[0][0][2];
    exerciseSeries = req.body.rutines[0][0][3];
    console.log(exerciseName, excersieMuscle, exerciseReps, exerciseSeries)
});

router.get('/rutines', (req, res) => {
    res.render('wod/show');
});


module.exports = router;
