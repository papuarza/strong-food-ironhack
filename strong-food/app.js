/*jshint esversion: 6*/
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const users = require('./routes/users.js');
const index = require('./routes/index');
const recipe = require('./routes/recipe');
const routines = require('./routes/routines');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost:27017/strong-food');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main-layout');
app.use(expressLayouts);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cookieParser());
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components/')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'strongfood',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));


passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
        if (err) {
            return cb(err);
        }
        cb(null, user);
    });
});

// Signing Up
passport.use('local-signup', new LocalStrategy({
        passReqToCallback: true
    },
    (req, username, password, next) => {
        // To avoid race conditions
        process.nextTick(() => {
            User.findOne({
                'username': username
            }, (err, user) => {
                if (err) {
                    return next(err);
                }

                if (user) {
                    return next(null, false);
                } else {
                    // Destructure the body
                    const {
                        username,
                        email,
                        password
                    } = req.body;
                    const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
                    const newUser = new User({
                        username,
                        email,
                        password: hashPass,
                        birthday: new Date(),
                        heigth: "000cms",
                        weight: "00kgs",
                        genere: "Empty"
                    });

                    newUser.save((err) => {
                        if (err) {
                            next(err);
                        }
                        return next(null, newUser);
                    });
                }
            });
        });
    }));

passport.use('local-login', new LocalStrategy((username, password, next) => {
    User.findOne({
        username
    }, (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return next(null, false, {
                message: "Incorrect username"
            });
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return next(null, false, {
                message: "Incorrect password"
            });
        }

        return next(null, user);
    });
}));

app.use(passport.initialize());
app.use(passport.session());



app.use((req, res, next) => {
    if (typeof(req.user) !== "undefined") {
        res.locals.userSignedIn = true;
    } else {
        res.locals.userSignedIn = false;
    }
    next();
});

app.use('/', index);
app.use('/', users);
app.use('/', recipe);
app.use('/', routines);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
