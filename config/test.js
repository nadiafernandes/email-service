'use strict';

module.exports = {
    title: 'email-provider',
    root: '',
    http: {
        port: 3000
    },
    sql: {

    },
    email: {
        from: 'email@email.com',
        transport: 'SMTP',
        services: {
            mailgun:{
                auth: {
                    api_key: ''
                }
            },
            sendGrid: {
                auth: {
                    api_key: ''
                }
            }
        },
        isTestMode: true,
        testRecipient: 'email@email.com'
    },
    mongodb: {
        database: 'mongodb://127.0.0.1:27017/email',
        emailCollection: 'emailQueue',
    },
};