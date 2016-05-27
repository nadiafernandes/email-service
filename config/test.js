'use strict';

module.exports = {
    title: 'email-provider',
    root: '',
    http: {
        port: 3000
    },
    email: {
        from: '',
        services: {
            mandrill:{
                transport: 'SMTP',
                service: {
                    service: 'Mandrill',
                    auth: {
                        user: '',
                        pass: ''
                    }
                },
            },
            sendGrid: {
                transport: 'SMTP',
                service: {
                    service: 'Mandrill',
                    auth: {
                        user: '',
                        pass: ''
                    }
                },
            }
        },
        isTestMode: false,
        testRecipient: ''
    },
    mongodb: {
        database: 'mongodb://127.0.0.1:27017/email',
        emailCollection: 'emailQueue',
    },
};