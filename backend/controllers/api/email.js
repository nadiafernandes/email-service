'use strict';

var config = require('../../../config'),
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
            res.error(e); //put the error here
        });

};

exports.create = function (req, res) {
    var email = req.body.email;
    email.isProcessed = false;

    req.db.collection(emailCollection)
        .insert(req.body.email, function (err, result) {
            if (err) {
                log.info(e);
                res.error(e); //put the error here
            }
            res.send(result);
        });

};

exports.details = function (req, res) {
    req.db.collection(emailCollection)
        .findOne({_id: req.db.ObjectId(req.params.emailId)}).toArray(function (err, data) {
        if (err) {
            return res.error(err);
        }
        return res.json(data);
    });
}


exports.delete = function (req, res) {
    req.db.collection(emailCollection)
        .remove({_id: req.db.ObjectId(req.params.emailId)}, function (err) {
            if (err) return res.error(err);
            return res.send();
        });
}