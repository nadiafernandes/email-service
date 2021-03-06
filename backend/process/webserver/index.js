'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    config = require('./../../../config'),
    routes = require('./../../routes/index'),
    mongodb = require('mongodb').MongoClient,
    mongodbConnection,
    bunyan = require('bunyan'),
    log = bunyan.createLogger({name: 'email-processor', src: true, hostname: ' '}),
    passport = require('passport'),
    BasicStrategy = require('passport-http').BasicStrategy;

passport.use(new BasicStrategy({},
    function (username, password, done) {
        var success = (username === config.auth.user && password === config.auth.pass);
        done(null, success);
    }
));

// Setup server
var app = express();
app.use(bodyParser.json());
app.use(passport.initialize());
// comment/remove this line below to disable auth
app.use(passport.authenticate('basic', { session: false }));
app.use(express.static(__dirname + '/frontend'));

app.use(function (req, res, next) {
    // log all API activity
    if (req.url.indexOf('/api') === 0 || req.url.indexOf('/modules') === 0) {
        console.log([req.method, req.url].join(' '));
        if (JSON.stringify(req.body) !== '{}') {
            console.log(req.body);
        }
    }
    next();
});


//this was the connection is already arrange and we use always the same
mongodb.connect(config.mongodb.database, function (err, mdb) {
    if (err) {
        console.log(err);
    }
    mongodbConnection = mdb;
});

app.use(function (req, res, next) {
    req.db = mongodbConnection;
    req.log = log;
    next();
});

require('../../../backend/routes')(app, express);

var server = app.listen(process.env.PORT || config.http.port, function () {
    var address = server.address();
    console.log('webserver running on', ['http://', address.address === '::' ? 'localhost' : address.address, ':', address.port].join(''));
});