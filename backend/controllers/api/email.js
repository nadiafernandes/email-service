'use strict';

var config = require('../../../config'),
    moment = require("moment"),
    pmongo = require('promised-mongo'),
    emailCollection = config.mongodb.emailCollection;

exports.index = function (req, res) {
    var query = {};
    if (req.query.process) query = {isProcessed: req.query.process === "true" ? true : false};

    req.db.collection(emailCollection)
        .find(query).toArray(function (err, data) {
            if (err) {
                req.log.info(e);
                return res.error(err);
            }
            return res.json(data);
        });
};

exports.update = function (req, res) {
};

exports.create = function (req, res) {
    var email = req.body.email;
    email.isProcessed = false;
    email.date = moment(new Date).format("DD-MM-YYYY HH:mm:ss");
    req.db.collection(emailCollection)
        .insert(req.body.email, function (err, result) {
            if (err) {
                req.log.info(err);
                res.error(err);
            }
            res.send(result);
        });
};

exports.delete = function (req, res) {
    console.log(req.params.emailId);
    req.db.collection(emailCollection)
        .remove({_id: pmongo.ObjectId(req.params.emailId)}, function (err) {
            if (err) {
                req.log.info(err);
                res.error(err);
            }
            res.send();
        });
}