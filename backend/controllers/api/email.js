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
                return res.error(err);
            }
            return res.json(data);
        })
        .catch(function (e) {
            log.info(e);
            res.error(e); //put the error here
        });
};

exports.update = function (req, res) {
    //check if the email has to be sent
    req.db.collection(emailCollection)
        .update({_id: req.mongodb.ObjectId(req.params.emailId)}, {$set: {content: req.body.content}})
        .then(function (updatedElem) {
            res.send(updatedElem)
        })
        .catch(function (e) {
            log.info(e);
            res.error(e);
        });

};

exports.create = function (req, res) {
    var email = req.body.email;
    email.isProcessed = false;
    email.date = moment(new Date).format("DD-MM-YYYY HH:mm:ss");
    req.db.collection(emailCollection)
        .insert(req.body.email, function (err, result) {
            if (err) {
                log.info(e);
                res.error(e);
            }
            res.send(result);
        })
        .catch(function (e) {
            log.info(e);
            res.error(e);
        });

};

exports.delete = function (req, res) {
    console.log(req.params.emailId);
    req.db.collection(emailCollection)
        .remove({_id: pmongo.ObjectId(req.params.emailId)}, function (err) {
            if (err) {
                console.log(err);
                res.error(err);
            }
            res.send();
        })
        .catch(function (e) {
            log.info(e);
            res.error(e);
        });
}