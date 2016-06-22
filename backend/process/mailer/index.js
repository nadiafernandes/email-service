'use strict';

var config = require('../../../config'),
    DELAY = 1000,
    _ = require('lodash'),
    async = require('async'),
    mongodb = require('mongodb').MongoClient,
    nodemailer = require('nodemailer'),
    sgTransport = require('nodemailer-sendgrid-transport'),
    mg = require('nodemailer-mailgun-transport'),
    utils = require("./utils"),
    bunyan = require('bunyan'),
    data = {},
    log = bunyan.createLogger({name: 'email-processor', src: true, hostname: ' '});

//because promise mongo do not work properly with mlab
mongodb.connect(config.mongodb.database, function (err, mdb) {
    if (err) console.log(err);
    async.forever(function (callback) {
        data = {};
        var emailQueueCollection = mdb.collection(config.mongodb.emailCollection);
        emailQueueCollection.findOne({isProcessed: false}, function (err, email) {
            if (err) log.info(e);

            if (!email) setTimeout(callback, DELAY);
            else {
                data.email = email; //email to process
                log.info('processing ' + email._id + ' (' + email.to + ')');

                //makes the connection with the functionality to send the emails and set it
                //if the connection is not working have to change to the other email provider
                //first try
                var smtpTransportSendGrid = nodemailer.createTransport(sgTransport(config.email.services.sendGrid));
                var smtpTransportGun = nodemailer.createTransport(mg(config.email.services.mailgun));

                //check if the system is in test mode, in that case does not send the emails to a real user
                var mailOptions = {
                    from: data.email.from ? data.email.from : config.email.from,
                    to: config.email.isTestMode ? config.email.testRecipient : data.email.to,
                    subject: data.email.subject || 'No subject',
                    text: data.email.body || null
                };
                console.log("I will send", mailOptions);
                /*smtpTransportSendGrid.sendMail(mailOptions, function (errSendGrid) {
                    smtpTransportSendGrid.close()
                    if (errSendGrid) {
                        log.info("Errr emailSending sendGrid ", errSendGrid);
                        smtpTransportGun.sendMail(mailOptions, function (errGun) {
                            smtpTransportGun.close();
                            if (errGun) {
                                log.info("Err emailSending mailgun ", errGun);
                                setTimeout(callback, DELAY);
                            } else {
                                log.info("email sent MG")
                                utils.saveModifiedCollection(emailQueueCollection, email);
                                callback();
                            }

                        });
                    } else {
                        smtpTransportGun.close();
                        log.info("email sent sg")
                        utils.saveModifiedCollection(emailQueueCollection, email);
                        callback();
                    }

                });*/
            }
        })
    });
});

