'use strict';

module.exports = {
    title: 'email-provider',
    root: '',
    http: {
        port: 3000
    },
    sql: {},
    email: {
        from: 'nadia.fernandess@gmail.com',
        transport: 'SMTP',
        services: {
            mailgun: {
                auth: {
                    api_key: 'key-1bbc52fa6f58b04d7586c03683cc13e6',
                    user: 'nadia.fernandess@gmail.com',
                    pass: '!mailgun!1'
                }
            },
            sendGrid: {
                auth: {
                    api_key: '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',
                    user: 'nadiaf',
                    pass: '!sendgrid!1'
                }
            }
        },
        isTestMode: true,
        testRecipient: 'nadia.fernandess@gmail.com'
    },
    mongodb: {
        database: 'mongodb://heroku_dh5n5112:a7dr0ri5gku69md5fstgd8sdlk@ds019053.mlab.com:19053/heroku_dh5n5112',
        emailCollection: 'emailQueue',
    },
};