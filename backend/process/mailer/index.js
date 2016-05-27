'use strict';

var config = require('../../../config'),
    async = require('async'),
    pmongo = require('promised-mongo'),
    nodemailer = require('nodemailer'),
    mongodb = pmongo(config.mongodb.database),
    sgTransport = require('nodemailer-sendgrid-transport'),
    bunyan = require('bunyan'),
    log = bunyan.createLogger({name: 'email-processor', src: true, hostname: ' '}),
    emailQueueCollection = mongodb.collection(config.mongodb.emailCollection); //allow to change the collection via config file

//function run forever
async.forever(function (callback) {
    var data = {};
    //in case of not processed emails
    emailQueueCollection.findOne({isProcessed: false})
        .then(function (email) {
            if (!email) return;
            else {
                data.email = email; //email to process
                log.info('processing ' + email._id + ' (' + email.to + ')');

                return emailQueueCollection.findAndModify({
                    query: {_id: pmongo.ObjectId(email._id)},
                    update: {$set: {isProcessed: true}}
                });
            }
        })
        //makes the connection with the functionality to send the emails and set it
        //if the connection is not working have to change to the other email provider
        .then(function () {
            if (data.email) {
                var smtpTransport = nodemailer.createTransport(sgTransport(config.email.services.sendGrid.service));//if service down try another one

                var mailOptions = {
                    from: data.email.from ? data.email.from : config.email.from,
                    to: config.email.isTestMode ? config.email.testRecipient : data.email.to,//check if the system is in test mode, in that case does not send the emails to a real user
                    subject: data.email.subject || 'No subject',
                    text: data.email.body || null
                };
                smtpTransport.sendMail(mailOptions, function (err) {
                    smtpTransport.close();
                    if (err) log.info("emailSending", err);
                    //try to use the other service in case of problem
                    callback();
                });
            }
            else {
                setTimeout(callback, 1000); //every second, because emails have to be fast
            }
        })
        .catch(function (err) {
            log.info(err);
            log.info('something went wrong!');
        });
});